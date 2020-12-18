export interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  isOwner: boolean;
  compare(enteredPassword: string, dbPassword: string): boolean;
}

interface IMenu {
  name: string;
  price: number;
}

export interface IReview {
  restaurantId: string;
  userId: string;
  rating: number;
  comment: string;
  date: Date;
}
export interface IRestaurant {
  name: string;
  owner: string;
  address: string;
  cuisine: string;
  openingHours: {
    startTime: Date;
    stopTime: Date;
  };
  review?: {
    rating: number;
    count: number;
  };
  images?: string[];
  ambienceSeats?: string[];
  ambienceSeating?: string[];
  menu: IMenu[];
  ambience: boolean;
  pax: number;
}

export interface IBooking {
  restaurantId: string;
  userId: string;
  date: Date;
  numberOfPax: number;
  hasReview: boolean;
}
