/**
 * Transaction CRUD controllers
 * @author Sead Ali
 */
import { Request, Response } from 'express';
import axios from 'axios';
import { AVALANCHE_RPC_URL, COINGECKO_API_URL, CACHE_TTL } from '@config';
import redisClient from '../utils/redisClient';

/**
 * Get transaction by hash
 * @param {object} req
 * @param {object} res
 */
export const getTransaction = async (req: Request, res: Response): Promise<Response> => {
  const { hash } = req.params;
  try {
    // Check cache first
    const cachedData = await redisClient.get(hash);
    if (cachedData) {
      return res.json({ success: true, transfers: JSON.parse(cachedData) }); // Success
    }

    // Fetch transaction receipt
    const response = await axios.post(AVALANCHE_RPC_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getTransactionReceipt',
      params: [hash],
    });

    if (!response.data?.result?.logs) {
      return res.status(404).json({ success: false, message: 'Logs not found' });
    }

    // Filter the logs
    const logs = response.data.result.logs.filter(
      (log: any) =>
        log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // We can also make the hash to be dynamic
    );

    if (!logs.length) {
      return res.status(404).json({ success: false, message: "Relevant logs weren't found" });
    }

    // Fetch token price. Note: We can also make it inside the below map if the address is dynamic, but I'm assuming the erc20 contract address will be same for all the erc20 transfers
    const priceResponse = await axios.get(
      `${COINGECKO_API_URL}?contract_addresses=${logs[0].address}&vs_currencies=usd`,
    );
    const price = priceResponse.data[logs[0].address]?.usd || 0;

    // Parse the data
    const erc20Transfers = logs.map((log: any) => {
      const from = `0x${log.topics[1].substring(26)}`;
      const to = `0x${log.topics[2].substring(26)}`;
      const value = parseInt(log.data, 16);
      const contractAddress = log.address;

      return {
        from,
        to,
        value,
        contractAddress,
        price,
      };
    });

    // Set data to cache
    await redisClient.set(hash, JSON.stringify(erc20Transfers), {
      EX: CACHE_TTL,
    });

    return res.json({ success: true, transfers: erc20Transfers }); // Success
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
