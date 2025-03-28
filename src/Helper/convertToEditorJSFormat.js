function convertToEditorJSFormat(content) {
    const blocks = [];
    const lines = content.split('\n').filter(line => line.trim() !== '');
    let currentList = [];
    let currentParagraph = [];
    let currentTable = null;
    let inCodeBlock = false;
    let currentCode = null;

    const cleanText = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')  // Bold
            .replace(/\*(?!\*)(.*?)(?<!\*)\*/g, '<i>$1</i>')  // Italic
            .replace(/`(.*?)`/g, '<code>$1</code>')  // Inline code
            .replace(/\*\*\*/g, '')                 // Remove standalone ***
            .replace(/\*\*/g, '')                   // Remove residual **
            .replace(/\*/g, '')                     // Remove residual *
            .trim();
    };

    const flushParagraph = () => {
        if (currentParagraph.length > 0) {
            blocks.push({
                type: 'paragraph',
                data: { text: cleanText(currentParagraph.join('<br>')) }
            });
            currentParagraph = [];
        }
    };

    const flushList = () => {
        if (currentList.length > 0) {
            blocks.push({
                type: 'list',
                data: {
                    style: 'unordered',
                    items: currentList.map(item => cleanText(item))
                }
            });
            currentList = [];
        }
    };

    const flushTable = () => {
        if (currentTable && currentTable.rows.length > 0) {
            blocks.push({
                type: 'table',
                data: {
                    withHeadings: true,
                    content: currentTable.rows
                }
            });
            currentTable = null;
        }
    };

    lines.forEach(line => {
        // Handle code blocks
        if (inCodeBlock) {
            if (line.trim().startsWith('```')) {
                blocks.push({
                    type: 'code',
                    data: {
                        code: currentCode.content.join('\n'),
                        language: currentCode.language
                    }
                });
                inCodeBlock = false;
                currentCode = null;
            } else {
                currentCode.content.push(line);
            }
            return;
        }

        const codeBlockStart = line.match(/^```(\w*)/);
        if (codeBlockStart) {
            inCodeBlock = true;
            currentCode = {
                language: codeBlockStart[1] || '',
                content: []
            };
            return;
        }

        // Handle tables
        if (line.trim().startsWith('|')) {
            if (!currentTable) currentTable = { rows: [] };

            const cells = line.split('|')
                .map(cell => cell.trim())
                .filter(cell => cell !== '');

            if (cells.every(cell => /^-+$/.test(cell))) return;

            currentTable.rows.push(cells.map(cell => cleanText(cell)));
            return;
        } else if (currentTable) {
            flushTable();
        }

        // Handle headers
        const headerMatch = line.match(/^(#+)\s(.*)/);
        if (headerMatch) {
            flushParagraph();
            flushList();
            blocks.push({
                type: 'header',
                data: {
                    text: cleanText(headerMatch[2]),
                    level: Math.min(headerMatch[1].length, 6)
                }
            });
            return;
        }

        // Handle horizontal rules
        const trimmedLine = line.trim();
        const hrContent = trimmedLine.replace(/\s+/g, '');
        if (/^[-*_]{3,}$/.test(hrContent)) {
            flushParagraph();
            flushList();
            blocks.push({ type: 'delimiter', data: {} });
            return;
        }

        // Handle list items
        if (line.startsWith('- ')) {
            flushParagraph();
            currentList.push(line.replace(/^- /, ''));
            return;
        }

        // Handle empty lines
        if (trimmedLine === '') {
            flushParagraph();
            flushList();
            return;
        }

        // Handle regular text
        currentParagraph.push(line);
    });

    // Final flushes
    flushParagraph();
    flushList();
    flushTable();

    return {
        time: Date.now(),
        blocks,
        version: '2.25.0'
    };
}


export default convertToEditorJSFormat