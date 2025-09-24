import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://mobile.handswork.pro',
  timeout: 15000,
});

export interface ShiftItem {
  id: string;
  logo: string;
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: number;
  planWorkers: number;
  workTypes: string;
  priceWorker: number;
  customerFeedbacksCount: number;
  customerRating: number; // max 5
}

export async function fetchShiftsByCoords(latitude: number, longitude: number): Promise<ShiftItem[]> {
  // Example endpoint from task description: /api/shift...lat=...&lon=...
  const response = await api.get(`/api/shift`, {
    params: {
      latitude,
      longitude,
    },
  });
  return response.data as ShiftItem[];
}


