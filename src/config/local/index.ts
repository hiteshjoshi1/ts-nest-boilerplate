import { Config } from "../config.service";

const config: Partial<Config> = {
    TYPEORM_HOST: "localhost",
    TYPEORM_USERNAME: "root",
    TYPEORM_PASSWORD: "root",
    TYPEORM_DATABASE: "photos",
    TYPEORM_PORT: 5432,
    PORT: 3000,
    KAFKA_BROKER: "localhost:9092",
    CONTRACT_REGISTRY_URL: "localhost:8020",
    CHAIN_NAME: "rinkeby",
    LOG_LEVEL: "debug",
    PRETTIER_ENABLED: true,
    SECRET_KEY:"vectors"
    
    
};

export default config;
