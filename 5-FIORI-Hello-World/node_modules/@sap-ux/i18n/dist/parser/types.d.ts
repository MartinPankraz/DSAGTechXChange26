import type { CsvParseResult } from './csv/types';
import type { PropertiesParseResult } from './properties/types';
export declare enum FileFormat {
    properties = "properties",
    csv = "csv",
    json = "json"
}
export type ParseResult = PropertiesParseResult | CsvParseResult;
//# sourceMappingURL=types.d.ts.map