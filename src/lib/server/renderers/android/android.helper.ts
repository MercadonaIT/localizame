import {escapeString} from "$lib/server/helpers/string.helper";
import type {LanguageInterface} from "$lib/server/interfaces/language.interface";
import type {RawDataType} from "$lib/server/interfaces/raw-data.interface";

export function getLiteralList(language: LanguageInterface, data: RawDataType[]) {
    return data.map((literal) => ({
        key: escapeString(Object.values(literal)[0]),
        value: escapeString(
            literal[
                Object.keys(literal).find(
                    (languageName) => languageName === language.name
                ) as string
                ]
        )
    }))
}