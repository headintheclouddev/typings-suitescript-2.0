interface PortletModule {
    resize(): void;
    refresh(): void;
}

declare module N {
    var portlet: PortletModule;
}

declare module 'N/portlet' {
    export = N.portlet;
}
