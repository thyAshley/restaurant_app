export interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  isOwner?: boolean;
  compare(enteredPassword: string, dbPassword: string): boolean;
}

interface IMenu {
  name: string;
  price: number;
}

interface IReview {
  restaurantId: string;
  userId: string;
  rating: number;
  comment: string;
  date: Date;
}
export interface IRestaurant {
  name: string;
  address: string;
  cuisine: string;
  openingHours: Date;
  rating: number;
  images: string[];
  menu: IMenu[];
  pax: number;
  reviews: IReview[]
}

export interface IBooking {
  restaurantId: string;
  userId: string;
  date: Date;
  time: Date;
  numberOfPax: number;
  hasReview: boolean;
}