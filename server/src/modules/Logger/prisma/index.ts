import { Prisma } from "@prisma/client";
import prisma from "@/config/prisma";
import logger from "../winston";

class PrismaLogger {
    private prisma;
    private isInternalLogEntry: boolean = false;

    constructor() {
        this.prisma = prisma;
        this.setupPrismaListeners();
    }

    private setupPrismaListeners() {
        this.prisma.$on('query', this.handleQuery.bind(this));
        this.prisma.$on('info', this.handleInfo.bind(this));
        this.prisma.$on('warn', this.handleWarn.bind(this));
        this.prisma.$on('error', this.handleError.bind(this));
    }

    private async handleQuery(e: Prisma.QueryEvent) {
        const operation = this.getOperationType(e.query);

        logger.info(`Query: ${e.query}, Duration: ${e.duration}ms`);

        this.isInternalLogEntry = true;


        await this.createLogEntry('query', `Query: ${e.query}, Duration: ${e.duration}ms`, operation, e.query);
    }

    private async handleInfo(e: Prisma.LogEvent) {
        const operation = this.getOperationType(e.target);

        logger.info(e.message);


        this.isInternalLogEntry = true;


        await this.createLogEntry('info', e.message, operation, e.target);
    }

    private async handleWarn(e: Prisma.LogEvent) {
        const operation = this.getOperationType(e.target);

        logger.warn(e.message);


        this.isInternalLogEntry = true;


        await this.createLogEntry('warn', e.message, operation, e.target);
    }

    private async handleError(e: Prisma.LogEvent) {
        const operation = this.getOperationType(e.target);

        logger.error(e.message);


        this.isInternalLogEntry = true;


        await this.createLogEntry('error', e.message, operation, e.target);
    }

    private async createLogEntry(level: string, message: string, operation: string, query: string) {
        console.log("🚀 ~ file: index.ts:69 ~ PrismaLogger ~ createLogEntry ~ query:", query === 'SELECT 1\t\t\t\t\t\t\n\n',)

        if (query.includes('"public"."Log"') || operation === 'UNKNOWN') {
            return;
        }

        return await prisma.log.create({
            data: {
                level,
                message,
                timestamp: new Date(),
                operation,
            },
        });
    }

    private getOperationType(query: string): string {
        if (query.startsWith('SELECT')) {
            return 'GET';
        } else if (query.startsWith('INSERT')) {
            return 'CREATE';
        } else if (query.startsWith('UPDATE')) {
            return 'UPDATE';
        } else if (query.startsWith('DELETE')) {
            return 'DELETE';
        } else {
            return 'UNKNOWN';
        }
    }
}

new PrismaLogger();

export const PrismaInstance = prisma;
