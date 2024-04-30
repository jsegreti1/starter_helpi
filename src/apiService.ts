import axios, { AxiosResponse } from 'axios';

interface Message {
  role: string;
  content: string;
}

interface ApiCallParams {
  model: string;
  messages: Message[];
}

interface GPTResponse {
  id: string;
  object: string;
  choices: [
    {
      text: string;
      index: number;
      logprobs: null | object;
      finish_reason: string;
    }
  ];
}

export const makeApiCall = async (apiKey: string, data: ApiCallParams): Promise<AxiosResponse<GPTResponse>> => {
  return axios.post('https://api.openai.com/v1/chat/completions', data, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });
};