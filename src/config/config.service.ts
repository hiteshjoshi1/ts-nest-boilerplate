import { Injectable, Logger } from "@nestjs/common";
import localConfigFile from "./local";
import prodConfigFile from "./prod";

export interface Fabric {
    ORGANIZATION:string
}

// this declares both the config type and default values
const configSchema = {
    TYPEORM_CONNECTION: "postgres",
    TYPEORM_HOST: "" as string,
    TYPEORM_USERNAME: "" as string,
    TYPEORM_PASSWORD: "" as string,
    TYPEORM_DATABASE: "" as string,
    TYPEORM_PORT: 5432 as number,
    TYPEORM_SYNCHRONIZE: false as boolean,
    TYPEORM_LOGGING: true as boolean,
    TYPEORM_ENTITIES: "dist/**/entities/**/*.js" as string,
    TYPEORM_MIGRATIONS: "dist/migration/**/*.js" as string,
    TYPEORM_MIGRATIONS_DIR: "src/migration" as string,
    TYPEORM_MIGRATIONS_RUN: true as boolean,
    TYPEORM_ENTITY_SCHEMAS: "auto" as string,
    TYPEORM_MIGRATIONS_TABLE_NAME: "auto-migration" as string,
    KAFKA_BROKER: "" as string,
    CONTRACT_REGISTRY_URL: "" as string,
    CHAIN_NAME: "rinkeby" as
        | "rinkeby"
        | "mainnet"
        | "goerli"
        | "ropsten"
        | "kovan",
    PORT: 3000 as number,
    LOG_LEVEL: "debug" as "debug" | "info" | "error" | "warn",
    PRETTIER_ENABLED: false as boolean,
    SECRET_KEY:"test" as string,
    FABRIC_NETWORK: {
        ORGANIZATION: "SettleMint" as string 
    }  as Fabric
} as const;
export type Config = typeof configSchema;
const configKeys = Object.keys(configSchema);

@Injectable()
export class ConfigService {
    public readonly config: Config;
    public readonly environments = ["local", "dev", "prod"];

    constructor() {
        const env = process.env.NODE_ENV;
        if (!this.environments.includes(env)) {
            throw Error(
                `Environment variable NODE_ENV with value "${env}" must be one of ${JSON.stringify(
                    this.environments
                )}`
            );
        }
        const fileConfig = this.loadFileConfig(env);
        Logger.log(
            `Loaded "${env}" file config:\n${JSON.stringify(
                fileConfig,
                null,
                "\t"
            )}`
        );

        // override environment variables
        const envConfig = {};
        for (const configKey of configKeys) {
            // override with environment variable value
            if (process.env[configKey] !== undefined) {
                envConfig[configKey] = process.env[configKey];
            }
        }
        Logger.log(
            `Loaded ${
                Object.keys(envConfig).length
            } "${env}" environment variable config for keys:\n${JSON.stringify(
                Object.keys(envConfig)
            )}`
        );

        const fileEnvConfig = {
            ...fileConfig,
            ...envConfig
        };

        // Convert environment variable integer and boolean
        for (const key of Object.keys(envConfig)) {
            if (typeof configSchema[key] === "number") {
                try {
                    envConfig[key] = parseInt(envConfig[key] as string, 10);
                } catch (err) {
                    throw Error(
                        `Failed to convert "${key}" config value "${envConfig[key]}" to a integer`
                    );
                }
            }
            if (typeof configSchema[key] === "boolean") {
                if (envConfig[key] === "true") {
                    envConfig[key] = true;
                } else if (envConfig[key] === "false") {
                    envConfig[key] = false;
                } else {
                    throw Error(
                        `Failed to convert "${key}" config value "${envConfig[key]}" to a boolean. Must be either true or false.`
                    );
                }
            }
        }

        // default config used
        const defaultConfig = {};
        for (const key of configKeys) {
            if (fileEnvConfig[key] === undefined) {
                defaultConfig[key] = configSchema[key];
            }
        }
        Logger.log(
            `Using default config:\n${JSON.stringify(
                defaultConfig,
                null,
                "\t"
            )}`
        );

        // merge default config, env config file and environment variable config
        const mergedConfig = {
            ...configSchema,
            ...fileConfig,
            ...envConfig
        } as Config;

        this.config = mergedConfig;
    }

    private loadFileConfig(env: string): Partial<Config> {
        switch (env) {
            case "local":
                return localConfigFile;
            case "prod":
                return prodConfigFile;
            default:
                return localConfigFile;
        }
    }
}
