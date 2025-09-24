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

// Mock данные для демонстрации
const MOCK_SHIFTS: ShiftItem[] = [
  {
    id: '1',
    logo: 'https://via.placeholder.com/60x60/4CAF50/white?text=Л',
    address: 'ул. Тверская, 15, Москва',
    companyName: 'Леруа Мерлен',
    dateStartByCity: '25.09.2025',
    timeStartByCity: '08:00',
    timeEndByCity: '16:00',
    currentWorkers: 3,
    planWorkers: 5,
    workTypes: 'Продавец-консультант',
    priceWorker: 2500,
    customerFeedbacksCount: 127,
    customerRating: 4.8,
  },
  {
    id: '2',
    logo: 'https://via.placeholder.com/60x60/2196F3/white?text=М',
    address: 'пр. Мира, 89, Москва',
    companyName: 'Магнит',
    dateStartByCity: '25.09.2025',
    timeStartByCity: '14:00',
    timeEndByCity: '22:00',
    currentWorkers: 1,
    planWorkers: 2,
    workTypes: 'Кассир',
    priceWorker: 1800,
    customerFeedbacksCount: 89,
    customerRating: 4.5,
  },
  {
    id: '3',
    logo: 'https://via.placeholder.com/60x60/FF9800/white?text=П',
    address: 'ул. Арбат, 12, Москва',
    companyName: 'Пятерочка',
    dateStartByCity: '26.09.2025',
    timeStartByCity: '10:00',
    timeEndByCity: '18:00',
    currentWorkers: 4,
    planWorkers: 3,
    workTypes: 'Мерчендайзер',
    priceWorker: 2200,
    customerFeedbacksCount: 156,
    customerRating: 4.2,
  },
  {
    id: '4',
    logo: 'https://via.placeholder.com/60x60/9C27B0/white?text=А',
    address: 'ул. Красная Площадь, 1, Москва',
    companyName: 'Ашан',
    dateStartByCity: '26.09.2025',
    timeStartByCity: '09:00',
    timeEndByCity: '17:00',
    currentWorkers: 2,
    planWorkers: 4,
    workTypes: 'Складской работник',
    priceWorker: 2000,
    customerFeedbacksCount: 203,
    customerRating: 4.6,
  },
  {
    id: '5',
    logo: 'https://via.placeholder.com/60x60/F44336/white?text=Д',
    address: 'ул. Садовое кольцо, 45, Москва',
    companyName: 'Дикси',
    dateStartByCity: '27.09.2025',
    timeStartByCity: '07:00',
    timeEndByCity: '15:00',
    currentWorkers: 0,
    planWorkers: 2,
    workTypes: 'Заведующий сменой',
    priceWorker: 3000,
    customerFeedbacksCount: 67,
    customerRating: 4.3,
  },
];

export async function fetchShiftsByCoords(latitude: number, longitude: number): Promise<ShiftItem[]> {
  try {
    console.log(`Загружаем смены для координат: ${latitude}, ${longitude}`);
    
    const response = await api.get('/api/shifts/map-list-unauthorized', {
      params: {
        latitude,
        longitude,
      },
    });

    // Преобразуем данные API в наш формат
    const apiShifts = response.data.data.map((shift: any) => ({
      id: shift.id,
      logo: shift.logo,
      address: shift.address,
      companyName: shift.companyName,
      dateStartByCity: shift.dateStartByCity,
      timeStartByCity: shift.timeStartByCity,
      timeEndByCity: shift.timeEndByCity,
      currentWorkers: shift.currentWorkers,
      planWorkers: shift.planWorkers,
      workTypes: shift.workTypes?.[0]?.name || 'Разнорабочий', // Берем первый тип работы
      priceWorker: shift.priceWorker,
      customerFeedbacksCount: parseInt(shift.customerFeedbacksCount?.split(' ')[0]) || 0,
      customerRating: shift.customerRating || 0,
    }));

    console.log(`Загружено ${apiShifts.length} смен`);
    return apiShifts;
  } catch (error) {
    console.error('Ошибка загрузки смен:', error);
    // В случае ошибки возвращаем mock данные как fallback
    console.log('Используем mock данные как fallback');
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_SHIFTS;
  }
}


