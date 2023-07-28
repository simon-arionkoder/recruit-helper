import { DataSource } from "typeorm";
import "reflect-metadata";
import { Candidate } from "./models/candidate";

export class DbUtils {
    dataSource: DataSource;
    constructor(){

    }
    async createConnection(){
        try{
            const AppDataSource = new DataSource({
                entities: [Candidate],
                synchronize: true,
                logging: false,
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "root",
                database: "recruit_helper",
            })
            this.dataSource = await AppDataSource.initialize();
        } catch(e){
            console.log('Error connecting - ', e);
        }
    }
    async saveCandidate(candidate: Candidate){
        try{
            const candidateRepository = this.dataSource.getRepository(Candidate)
            await candidateRepository.save(candidate)
            const savedCandidate = await candidateRepository.find({where: {id: candidate.id}})
            return savedCandidate;
        } catch(e){
            console.log('Error saving candidate - ', e)
        }
    }
    async getCandidate(id: Candidate['id']){
        try{
            const candidateRepository = this.dataSource.getRepository(Candidate)
            const candidate = await candidateRepository.findOne({where: {id}});
            return candidate;
        } catch(e){
            console.log('Error retrieving candidate - ', e)
        }
    }
}