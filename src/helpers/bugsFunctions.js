export function onViewBug(bug, setterFn, navigateFn) {
    setterFn(bug);
    navigateFn(`/projects/${bug.project._id}/bug/${bug._id}`);
}

export function onOpenDeleteBug(bug, setterFn, openerFn) {
    setterFn(bug);
    openerFn(true);
}

export function onOpenAssignBug(bug, setterFn, openerFn) {
    setterFn(bug);
    openerFn(true);
}