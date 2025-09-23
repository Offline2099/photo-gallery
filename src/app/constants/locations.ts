import { LocationGroup } from '../types/galleries/location-group.interface';

export enum Location {
  bangkok = 'Bangkok',
  pattaya = 'Pattaya',
  northOfPattaya = 'North of Pattaya',
  northeastOfPattaya = 'Northeast of Pattaya',
  eastOfPattaya = 'East of Pattaya',
  southeastOfPattaya = 'Southeast of Pattaya',
  southOfPattaya = 'South of Pattaya',
  sattahip = 'Sattahip',
  khaoKheowOpenZoo = 'Khao Kheow Open Zoo',
  lumphiniPark = 'Lumphini Park',
  watYansangwararam = 'Wat Yansangwararam',
  pongPublicPark = 'Pong Public Park',
  lanPhoPark = 'Lan Pho Park',
  siamCountryClub = 'Siam Country Club',
  jomtienBeach = 'Jomtien Beach',
  dongtanBeach = 'Dongtan Beach',
  yinyomBeach = 'Yinyom Beach',
  pattayaBeach = 'Pattaya Beach',
  naKluaBeach = 'Na Klua Beach',
  bangSarayBeach = 'Bang Saray Beach',
  mabprachanReservoir = 'Mabprachan Reservoir',
  banAmphoeReservoir = 'Ban Amphoe Reservoir',
  chakNokReservoir = 'Chak Nok Reservoir',
  khunChitReservoir = 'Khun Chit Reservoir',
  bangPhaiReservoir = 'Bang Phai Reservoir',
  nongKlangDongReservoir = 'Nong Klang Dong Reservoir',
  khaoPhraTamnak = 'Khao Phra Tamnak',
  khaoDin = 'Khao Din',
  khaoPhai = 'Khao Phai',
  khaoMaiKaeo = 'Khao Mai Kaeo',
}

export const LOCATION_GROUPS: LocationGroup[] = [
  {
    name: 'Cities\xa0and Regions',
    locations: [
      Location.bangkok,
      Location.pattaya,
      Location.northOfPattaya,
      Location.northeastOfPattaya,
      Location.eastOfPattaya,
      Location.southeastOfPattaya,
      Location.southOfPattaya,
      Location.sattahip
    ]
  },
  {
    name: 'Parks',
    locations: [
      Location.khaoKheowOpenZoo,
      Location.lumphiniPark,
      Location.watYansangwararam,
      Location.pongPublicPark,
      Location.lanPhoPark,
      Location.siamCountryClub
    ]
  },
  {
    name: 'Beaches',
    locations: [
      Location.jomtienBeach,
      Location.dongtanBeach,
      Location.yinyomBeach,
      Location.pattayaBeach,
      Location.naKluaBeach,
      Location.bangSarayBeach
    ]
  },
  {
    name: 'Reservoirs',
    locations: [
      Location.mabprachanReservoir,
      Location.banAmphoeReservoir,
      Location.chakNokReservoir,
      Location.khunChitReservoir,
      Location.bangPhaiReservoir,
      Location.nongKlangDongReservoir
    ]
  },
  {
    name: 'Hills',
    locations: [
      Location.khaoPhraTamnak,
      Location.khaoDin,
      Location.khaoPhai,
      Location.khaoMaiKaeo
    ]
  }
];
