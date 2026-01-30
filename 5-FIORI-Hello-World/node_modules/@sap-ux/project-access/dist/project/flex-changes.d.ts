import type { Editor } from 'mem-fs-editor';
/**
 * Reads all flex change files from the changes directory.
 *
 * @param changesPath - path to changes directory.
 * @param memFs - optional mem-fs-editor instance.
 * @returns A promise that resolves to an array of flex change files.
 */
export declare function readFlexChanges(changesPath: string, memFs?: Editor): Promise<{
    [key: string]: string;
}>;
//# sourceMappingURL=flex-changes.d.ts.map