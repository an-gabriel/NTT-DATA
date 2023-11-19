export interface FarmerCreateInput {
    documentType: string;
    documentNumber: string;
    name: string;
    farmName: string;
    city: string;
    state: string;
    totalAreaHectares: number;
    arableAreaHectares: number;
    vegetationAreaHectares: number;
}