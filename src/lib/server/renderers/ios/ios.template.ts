export const stringsTemplate = `import UIKit
protocol Localizable: CustomStringConvertible {
    var rawValue: String { get }
}

extension Localizable {
    var localized: String {
        return NSLocalizedString(self.rawValue, comment: "")
    }

    var uppercased: String {
        return self.localized.uppercased()
    }

    var description: String {
        return self.localized
    }

    func localized(with: CVarArg...) -> String {
        let text = String(format: self.localized, arguments: with)
        return text
    }
}

extension String {
{{#groups}}
    public enum {{name}}: String, Localizable {
        {{#literals}}
            case {{group}} = "{{value}}"
        {{/literals}}
    }
{{/groups}}
}`;

export const localizableTemplate = `{{#literals}}
"{{key}}" = "{{value}}";
{{/literals}}`;
