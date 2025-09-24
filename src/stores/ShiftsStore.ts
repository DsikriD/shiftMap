import {makeAutoObservable, runInAction} from 'mobx';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';
import {fetchShiftsByCoords, ShiftItem} from '../api/client';

export class ShiftsStore {
  shifts: ShiftItem[] = [];
  isLoading: boolean = false;
  location: { latitude: number; longitude: number } | null = null;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  requestLocationPermission = async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        const fine = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Доступ к геолокации',
            message: 'Нужно разрешение, чтобы показать смены рядом с вами',
            buttonPositive: 'OK',
          },
        );
        if (fine !== PermissionsAndroid.RESULTS.GRANTED) return false;
        // coarse is implicitly granted with fine on most versions, but request explicitly for completeness
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        );
        return true;
      }
      const hasPermission = await Geolocation.requestAuthorization('whenInUse');
      return hasPermission === 'granted' || hasPermission === 'always';
    } catch (e) {
      return false;
    }
  };

  getCurrentPosition = (): Promise<GeoPosition> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          forceRequestLocation: true,
          showLocationDialog: true,
        },
      );
    });
  };

  loadInitial = async () => {
    this.isLoading = true;
    this.error = null;
    try {
      const granted = await this.requestLocationPermission();
      if (!granted) throw new Error('Location permission denied');
      const pos = await this.getCurrentPosition();
      const {latitude, longitude} = pos.coords;
      runInAction(() => {
        this.location = {latitude, longitude};
      });
      const data = await fetchShiftsByCoords(latitude, longitude);
      runInAction(() => {
        this.shifts = Array.isArray(data) ? data : [];
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e?.message ?? 'Unknown error';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  getById = (id: string): ShiftItem | undefined => {
    return this.shifts.find(s => s.id === id);
  };
}

export const shiftsStore = new ShiftsStore();


