export declare const prompts: {
    name: string;
    when: (answers: {
        workspace: string;
    }) => boolean;
    choices: ({
        name: string;
        value: string;
    } | {
        name: string;
        value: boolean;
    })[];
    message: string;
    type: string;
}[];
declare enum templates {
    'cloudbuild' = 0,
    'github' = 1,
    'gitlab' = 2,
    'azure' = 3
}
export declare const pipelinesActionHandler: (type: keyof templates, actions: any[], destination: string, templatePath: string) => any[];
export {};
//# sourceMappingURL=pipelines.d.ts.map