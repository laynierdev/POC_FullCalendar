'use client';

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { getEvents, addEvent, updateEvent, deleteEvent, CalendarEvent } from '@/services/eventsServices';
import { EventClickArg } from '@fullcalendar/core';

const BeautyCalendar: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>(getEvents());

    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [newTitle, setNewTitle] = useState('');
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('10:00');


    const [showEditModal, setShowEditModal] = useState(false);
    const [editEvent, setEditEvent] = useState<CalendarEvent | null>(null);

    // --------- HANDLERS ----------
    const handleDateClick = (arg: { dateStr: string }) => {
        setSelectedDate(arg.dateStr);
        setShowAddModal(true);
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        const ev = clickInfo.event;
        setEditEvent({
            id: ev.id,
            title: ev.title,
            start: ev.startStr,
            end: ev.endStr ?? '',
            className: ev.classNames.join(' ')
        });
        setShowEditModal(true);
    };

    const handleAddEvent = () => {
        if (newTitle.trim() === '') return;
        const start = `${selectedDate}T${startTime}`;
        const end = `${selectedDate}T${endTime}`;

        const newEvent: CalendarEvent = {
            id: String(events.length + 1),
            title: newTitle,
            start,
            end,
            className: 'bg-secondary text-white'
        };

        addEvent(newEvent);
        setEvents(getEvents());
        setNewTitle('');
        setStartTime('09:00');
        setEndTime('10:00');
        setShowAddModal(false);
    };

    const handleUpdateEvent = () => {
        if (!editEvent) return;
        updateEvent(editEvent);
        setEvents(getEvents());
        setShowEditModal(false);
    };

    const handleDeleteEvent = () => {
        if (!editEvent) return;
        deleteEvent(editEvent.id);
        setEvents(getEvents());
        setShowEditModal(false);
    };

    // --------- RENDER ----------
    return (
        <div className="container mt-4 mb-5 p-4 bg-white shadow rounded">
            <h2 className="text-center mb-4">Agenda</h2>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin]}
                themeSystem="bootstrap"
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                editable={true}
                droppable={true}
                height="auto"
            />

            {/* Modal Add */}
            {showAddModal && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <h5 className="modal-title">Add event</h5>
                                <button type="button" className="close" onClick={() => setShowAddModal(false)}>
                                    <span style={{padding:"5px", backgroundColor:"black", color:"ghostwhite"}}>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className="text-muted">date selected: {selectedDate}</p>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Start</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Ends</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancelar</button>
                                <button className="btn btn-primary" onClick={handleAddEvent}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal EDIT */}
            {showEditModal && editEvent && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <h5 className="modal-title">Edit event</h5>
                                <button type="button" className="close" onClick={() => setShowEditModal(false)}>
                                    <span style={{padding:"5px", backgroundColor:"black", color:"ghostwhite"}}>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editEvent.title}
                                        onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Start</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={editEvent.start.split('T')[1]?.substring(0, 5)}
                                        onChange={(e) =>
                                            setEditEvent({ ...editEvent, start: editEvent.start.split('T')[0] + 'T' + e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <label>End</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={editEvent.end?.split('T')[1]?.substring(0, 5) || ''}
                                        onChange={(e) =>
                                            setEditEvent({ ...editEvent, end: editEvent.start.split('T')[0] + 'T' + e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger mr-auto" onClick={handleDeleteEvent}>Eliminar</button>
                                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancelar</button>
                                <button className="btn btn-primary" onClick={handleUpdateEvent}>Guardar cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BeautyCalendar;
