'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        // Angular Specific Path to the file which conatins english language internationalization.
        const path = '**/src/i18n/en.json';
        // Instantiating a class of InternationalizationCreator
        let creator = new InternationalizationCreator();
        // This method is called only once during the first time when the extension is fired.
        // It finds the file with the specific path and opens it for editing.
        yield creator.findAndOpenFile(path);
        let disposable = vscode.commands.registerCommand('extension.angularTranslate', () => {
            // This method gets fired everytime the extension is called.
            creator.internationalize();
        });
        // Adding the instantiated members to subscriptions array for safe disposal during extension unloading.
        context.subscriptions.push(creator);
        context.subscriptions.push(disposable);
    });
}
exports.activate = activate;
class InternationalizationCreator {
    /**
     * @name findAndOpenFile
     * @description Looks for the file by its path passed as argument and opens it as a TextDocument for editing purpose.
     * @param path - A string that has the path for the file to be opened.
     */
    findAndOpenFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let file = yield vscode.workspace.findFiles(path);
            // If the file is not found
            if (!file) {
                return;
            }
            let doc = yield vscode.workspace.openTextDocument(file[0].path);
            this._document = doc;
        });
    }
    /**
     * @name internationalize
     * @description Detects the selection in the activeTextEditor and calls @function addToFile for adding the selected text in English Internationalization file.
     * It also replaces the selected text with the key added in the English Internationalization file by appending the translate pipe for Angular.
     */
    internationalize() {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let selection = editor.selection;
        let text = editor.document.getText(selection);
        this.addToFile(text);
        editor.edit(builder => {
            builder.replace(selection, `{{'${this._wordKey}' | translate}}`);
        }).then(success => {
            var postion = editor.selection.end;
            editor.selection = new vscode.Selection(postion, postion);
        });
    }
    /**
     * @name addToFile
     * @param text - A string which needs to be translated.
     * @description It formats the string by taking the first five words as key and the text as value and adds it to the file specified.
     */
    addToFile(text) {
        const edit = new vscode.WorkspaceEdit();
        let lineCount = this._document.lineCount;
        let secondLastLine = this._document.lineAt(lineCount - 2);
        // After removing any whitespaces, if the number of words are greater than 5 , extract 5 words otherwise extract the whole string into an array.
        const workKeyArray = text.trim().split(' ').length > 5 ? text.trim().split(' ').slice(0, 5) : text.split(' ');
        // Remove any character except for alphabets, number and whitespaces.
        workKeyArray.map((word, index) => {
            const lowerCaseWord = word.toLowerCase();
            workKeyArray[index] = lowerCaseWord.replace(/([^a-z0-9\s])/ig, '');
        });
        // Join the formated word with a underscore to form a string.
        this._wordKey = workKeyArray.join('_');
        // Append the key and value in the file if it is not present.
        if (!this._document.getText().includes(this._wordKey)) {
            edit.insert(this._document.uri, secondLastLine.range.end, `,\n"${this._wordKey}": "${text}"`);
        }
        return vscode.workspace.applyEdit(edit);
    }
    dispose() {
    }
}
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map