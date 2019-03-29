import { PersonGender } from './person-gender';
import { Location } from './location';
import { Feature } from './feature';
import { Trip } from './trip';

export interface Person {
    // Properties
    UserName: string;
    FirstName: string;
    LastName: string;
    MiddleName?: string;
    Gender?: PersonGender;
    Age?: number;
    Emails?: string[];
    AddressInfo?: Location[];
    HomeAddress?: Location;
    FavoriteFeature?: Feature;
    Features?: Feature[];

    // Navigation properties
    Friends?: Person[];
    BestFriend?: Person;
    Trips?: Trip[];
}