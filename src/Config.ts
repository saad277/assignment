enum EnvironmentType {
    DEV = "DEV",
    LOCAL = "LOCAL",
    PROD = "PROD"
}
type ConfigType = {
    ENVIRONMENTS: Record<EnvironmentType, Record<string, any>>;
};

const Config: ConfigType = {
    ENVIRONMENTS: {
        LOCAL: {
            LIMIT: 10,
            API_URL: ""
        },
        DEV: {
            LIMIT: 10,
            API_URL: " "
        },
        PROD: {
            LIMIT: 10,
            API_URL: ""
        }
    }
};

const ENVIRONMENT = EnvironmentType.DEV;

export default Config.ENVIRONMENTS[ENVIRONMENT];
