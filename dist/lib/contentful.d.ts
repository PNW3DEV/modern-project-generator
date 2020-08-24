export declare const initMessage: (message: string) => void;
export declare const prompts: ({
    name: string;
    message: string;
    when: any;
    validate: (input: string) => true | "Space ID must be 12 lowercase characters";
} | {
    name: string;
    when: any;
    message: string;
    validate?: undefined;
})[];
export declare const actionsHandler: ({ spaceId, managementToken, accessToken, previewAccessToken, name: appName, workspace }: {
    [key: string]: string;
}) => void;
//# sourceMappingURL=contentful.d.ts.map