import { DataSource } from "typeorm";
import "reflect-metadata";
import { Candidate } from "./models/candidate";
import { Positions } from "./models/positions";
import { createUniqueId } from "../utils/genericUtils";

export class DbUtils {
    dataSource: DataSource;
    constructor(){

    }
    async createConnection(){
        try{
            const AppDataSource = new DataSource({
                entities: [Candidate, Positions],
                synchronize: true,
                logging: false,
                type: "mysql",
                host: process.env.DB_HOST,
                port: 3306,
                username: process.env.DB_USERNAME,
                password: process.env.DB_SECRET,
                database: "recruit_helper",
            })
            console.log(AppDataSource);
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

    async updateCandidateStatus(candidate: Candidate){
        try{
            const candidateRepository = this.dataSource.getRepository(Candidate)
            await candidateRepository.createQueryBuilder()
            .update(Candidate)
            .set({ status: candidate.status})
            .where("unique_id = :id", { id: candidate.unique_id })
            .execute();
            const savedCandidate = await candidateRepository.find({where: {unique_id: candidate.unique_id}})
            return savedCandidate;
        } catch(e){
            console.log('Error updating candidate - ', e)
        }
    }

    async savePosition(position: Positions){
        try{
            const positionRepository = this.dataSource.getRepository(Positions)
            await positionRepository.save(position)
            const savedPosition = await positionRepository.find({where: {name: position.name}})
            return savedPosition;
        } catch(e){
            console.log('Error saving position - ', e)
        }
    }

    async getCandidate(unique_id: Candidate['unique_id']){
        try{
            const candidateRepository = this.dataSource.getRepository(Candidate)
            const candidate = await candidateRepository.findOne({where: {unique_id}});
            return candidate;
        } catch(e){
            console.log('Error retrieving candidate - ', e)
        }
    }

    async getPositions(){
        try{
            const positionsRepository = this.dataSource.getRepository(Positions)
            const positions = await positionsRepository.find();
            return positions;
        } catch(e){
            console.log('Error retrieving positions - ', e)
        }
    }

    async getAllCandidates(){
        try{
            const candidateRepository = this.dataSource.getRepository(Candidate)
            const candidates = await candidateRepository.find();
            return candidates;    
        } catch(e){
            console.log('Error retrieving all candidates - ', e);
        }
    }
}