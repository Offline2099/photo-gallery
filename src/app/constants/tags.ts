import { TagGroup } from '../types/galleries/tag-group.interface';

export enum Tag {
  animals = 'animals',
  people = 'people',
  trees = 'trees',
  flowers = 'flowers',
  temple = 'temple',
  shrine = 'shrine',
  statue = 'statue',
  landmark = 'landmark',
  boats = 'boats',
  road = 'road',
  waterbody = 'waterbody',
  hills = 'hills',
  islands = 'islands',
  panorama = 'panorama',
  city = 'city',
  beach = 'beach',
  park = 'park',
  forest = 'forest',
  countryside = 'countryside',
  zoo = 'zoo',
  sunny = 'sunny',
  cloudy = 'cloudy',
  rain = 'rain',
  fog = 'fog',
  sunrise = 'sunrise',
  morning = 'morning',
  day = 'day',
  evening = 'evening',
  sunset = 'sunset'
}

export const TAG_GROUPS: TagGroup[] = [
  {
    name: 'Features',
    tags: [
      Tag.animals,
      Tag.people,
      Tag.trees,
      Tag.flowers,
      Tag.temple,
      Tag.shrine,
      Tag.statue,
      Tag.landmark,
      Tag.boats,
      Tag.road,
      Tag.waterbody,
      Tag.hills,
      Tag.islands,
      Tag.panorama
    ],
  },
  {
    name: 'Area Type',
    tags: [
      Tag.city,
      Tag.beach,
      Tag.park,
      Tag.forest,
      Tag.countryside,
      Tag.zoo
    ]
  },
  {
    name: 'Weather',
    tags: [
      Tag.sunny,
      Tag.cloudy,
      Tag.rain,
      Tag.fog
    ]
  },
  {
    name: 'Time of Day',
    tags: [
      Tag.sunrise,
      Tag.morning,
      Tag.day,
      Tag.evening,
      Tag.sunset
    ]
  }
];