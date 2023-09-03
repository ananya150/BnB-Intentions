import axios from "axios";
import { error } from "console";
import openai from "openai";

interface Message {
  role: string;
  content: string;
}

const GPT_MODEL = "gpt-3.5-turbo-0613";
const OPENAI_API_KEY = process.env.OPENAI_KEY;
const apiUrl = "https://api.openai.com/v1/chat/completions";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${OPENAI_API_KEY}`,
};

export const chatCompletionRequest = async (messages: Message[]) => {
  const json_data = {
    model: GPT_MODEL,
    messages: messages,
    temperature: 0,
    top_p: 0,
    functions: openAiFunctions,
    function_call: "auto",
  };

  try {
    const response = await axios.post(apiUrl, json_data, {
      headers: headers,
    });

    console.log("Response fetched");
    console.log(response.data["choices"][0].message);
    return response.data["choices"][0].message;
  } catch (e) {
    console.log("Some error happened");
    console.error(e);
    return null;
  }
};

const openAiFunctions = [
  {
    name: "transfer",
    description: "Transfer assets (BNB or BUSD) to a wallet address.",
    parameters: {
      type: "object",
      properties: {
        asset_name: {
          type: "string",
          description:
            "The asset to be transferred. MUST be either BNB or BUSD",
        },
        to: {
          type: "string",
          description:
            "The ethereum address where the token needs to be transferred. For example 0xea7e50101aD33Cba51eB2730299942A6Fc9BaA6C ",
        },
        amount: {
          type: "string",
          description:
            "The amount of tokens to be transferred. For Example 12, 0.054, etc.",
        },
      },
      required: ["asset_name", "to", "value"],
    },
  },
  {
    name: "from_swap",
    description:
      "Swap assets with from amount given. Like 5 BNB to BUSD or BUSD from 8 BNB.",
    parameters: {
      type: "object",
      properties: {
        from_asset: {
          type: "string",
          description:
            "The asset to be swapped from. MUST be either BNB or BUSD",
        },
        to_asset: {
          type: "string",
          description:
            "The asset to be swapped to. MUST be either BNB or BUSD. Different from from_asset parameter.",
        },
        from_amount: {
          type: "string",
          description:
            "The amount of tokens of from_asset to be swapped to. Number of tokens that the user wants of initial assets to be swapped to.",
        },
      },
      required: ["from_asset", "to_asset", "from_amount"],
    },
  },
  {
    name: "to_swap",
    description:
      "Swap assets with to amount given. Like  BNB to 5 BUSD or 10 BUSD from BNB.",
    parameters: {
      type: "object",
      properties: {
        from_asset: {
          type: "string",
          description:
            "The asset to be swapped from. MUST be either BNB or BUSD",
        },
        to_asset: {
          type: "string",
          description:
            "The asset to be swapped to. MUST be either BNB or BUSD. Different from from_asset parameter.",
        },
        to_amount: {
          type: "string",
          description:
            "The amount of tokens of to_asset to be swapped to. Number of tokens that the user wants of final assets.",
        },
      },
      required: ["from_asset", "to_asset", "to_amount"],
    },
  },
  {
    name: "cross_chain_swap",
    description:
      "Swap BUSD between the BSC and OPBNB chains. Swap BUSD from BSC to BUSD on OPBNB or vice versa. Only BUSD cross chain swaps are possible. The sending and receiving address on both chains are same. ",
    parameters: {
      type: "object",
      properties: {
        from_chain: {
          type: "string",
          description:
            "The chain name from which assets need to be transferred from. MUST be either BSC or OPBNB",
        },
        to_chain: {
          type: "string",
          description:
            "The chain name to which assets need to be transferred from. MUST be either BSC or OPBNB. Different from from_chain",
        },
        busd_amount: {
          type: "string",
          description:
            "The amount of BUSD to be transferred from from_chain to to_chain",
        },
      },
      required: ["from_chain", "to_chain", "busd_amount"],
    },
  },
];
