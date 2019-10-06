export class Weather {
    constructor(
        public _id?: number,
        public city?: {
            id: number,
            name: string
        },
        public coords?: {
            lat: number,
            lon: number
        },
        public temp?: number,
        public tempMin?: number,
        public tempMax?: number,
        public description?: string,
        public icon?: string,
        public observation?: string,
        public date?: string
    ) {}
}
