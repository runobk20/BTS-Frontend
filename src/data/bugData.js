export const tagColors = {
    'New': 'purple',
    'In Progress': 'blue',
    'Pending': 'yellow',
    'Resolved': 'green',
    'Closed': 'teal',
    'Deferred': 'red',
    'ReOpen': 'blue',
    'Duplicated': 'orange'
}

export const attColors = {
    Low: 'blue',
    Medium: 'yellow',
    High: 'orange',
    Critical: 'red',
    Immediate: 'red',
}

export const tagStyle = {
    size: {
        base: 'sm',
        md: 'md',
        lg: 'lg'
    }
}

export const priorityOptions = [
    {low: 'Low'},
    {medium: 'Medium'},
    {high: 'High'},
    {immediate: 'Immediate'}
];

export const severityOptions = [
    {low: 'Low'},
    {medium: 'Medium'},
    {high: 'High'},
    {critical: 'Critical'}
];

export const statusOptions = [
    {inProgress: 'In Progress'},
    {pending: 'Pending'},
    {resolved: 'Resolved'},
    {closed: 'Closed'},
    {deferred: 'Deferred'},
    {reOpen: 'Re Open'},
    {duplicated: 'Duplicated'},
]

export function formatDate(dateStr) {
    const splited = dateStr.split('T');
    const formatedDate = {
      date: splited[0]
    }    
    return formatedDate;
}