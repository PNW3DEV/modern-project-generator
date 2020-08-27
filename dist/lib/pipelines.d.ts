import { Actions, PromptQuestion } from 'node-plop';
export declare const prompts: PromptQuestion[];
declare enum templates {
    'cloudbuild' = 0,
    'github' = 1,
    'gitlab' = 2,
    'azure' = 3
}
export declare const pipelinesActionHandler: (type: keyof templates, actions: any[], destination: string, templatePath: string) => Actions;
export {};
//# sourceMappingURL=pipelines.d.ts.map