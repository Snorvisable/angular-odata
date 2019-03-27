import { PlanItem } from './plan-item';

export interface Trip {
    TripId: number;
    ShareId: string;
    Name: string;
    Budget: number;
    Description: string;
    Tags: string[];
    StartsAt: Date;
    EndsAt: Date;
    PlanItems: PlanItem[];
}