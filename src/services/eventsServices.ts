// services/eventsService.ts
export interface CalendarEvent {
    id: string;
    title: string;
    start: string;
    end?: string;
    className?: string;
}

let events: CalendarEvent[] = [
    { id: '1', title: 'Haircut - Anna', start: '2025-10-03T10:00:00', end: '2025-10-03T11:00:00', className: 'bg-primary text-white' },
    { id: '2', title: 'Massage - Bob', start: '2025-10-04T14:00:00', end: '2025-10-04T15:30:00', className: 'bg-success text-white' },
    { id: '3', title: 'Facial - Clara', start: '2025-10-05T09:00:00', end: '2025-10-05T10:00:00', className: 'bg-warning text-dark' },
    { id: '4', title: 'Nails - Diana', start: '2025-10-07T16:00:00', end: '2025-10-07T17:00:00', className: 'bg-info text-white' },
    { id: '5', title: 'Color - Emma', start: '2025-10-09T11:00:00', end: '2025-10-09T12:30:00', className: 'bg-danger text-white' },
];

export function getEvents(): CalendarEvent[] {
    return events;
}

export function addEvent(newEvent: CalendarEvent) {
    events = [...events, newEvent];
}


export function updateEvent(updated: CalendarEvent) {
    events = events.map(ev => ev.id === updated.id ? updated : ev);
}

export function deleteEvent(id: string) {
    events = events.filter(ev => ev.id !== id);
}