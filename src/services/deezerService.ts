import { Injectable, HttpService } from '@nestjs/common';
interface IDeezerService {
    findArtist(names: string[]): Promise<number>;
    findTopByArtis(artistId: number): Promise<void>;
}

@Injectable()
export class DeezerService implements IDeezerService {
    constructor(private readonly httpService: HttpService) {}

    async findArtist(names: string[]): Promise<number> {
        const a: number = await new Promise((resolve, reject) =>
            this.httpService.get(`https://api.deezer.com/search/artist?q=${names.join('%20')}&limit=1`)
            .subscribe((response) => {
                if (response.data.data[0]) {
                    resolve(parseInt(response.data.data[0].id));
                } else {
                    resolve(0)
                }
            })
        );
        return a;
    }

    async findTopByArtis(artistId: number): Promise<any> {
        return await new Promise((resolve, reject) => {
            this.httpService.get(`https://api.deezer.com/artist/${artistId}/top`)
            .subscribe((response) => {
                resolve(response.data.data);
            })
        })
    }
}
