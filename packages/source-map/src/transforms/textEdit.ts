import type { SourceMap } from '..';
import { InsertReplaceEdit } from 'vscode-languageserver/node';
import { TextEdit } from 'vscode-languageserver/node';

export function transform(textEdit: TextEdit | InsertReplaceEdit, sourceMap: SourceMap): TextEdit | InsertReplaceEdit | undefined {
    if (TextEdit.is(textEdit)) {

        const range = sourceMap.getSourceRange(textEdit.range.start, textEdit.range.end);
        if (!range) return;

        return {
            ...textEdit,
            range,
        };
    }
    else if (InsertReplaceEdit.is(textEdit)) {

        const insert = sourceMap.getSourceRange(textEdit.insert.start, textEdit.insert.end);
        if (!insert) return;

        const replace = sourceMap.getSourceRange(textEdit.replace.start, textEdit.replace.end);
        if (!replace) return;

        return {
            ...textEdit,
            insert,
            replace,
        };
    }
}
