import { Config } from "../config.service";

const config: Partial<Config> = {
    KAFKA_BROKER: "",
    CONTRACT_REGISTRY_URL: "",
    CHAIN_NAME: "rinkeby",
    LOG_LEVEL: "debug",
    PRETTIER_ENABLED: false
};

export default config;
