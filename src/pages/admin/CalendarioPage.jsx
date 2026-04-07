import { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [showEventForm, setShowEventForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [view, setView] = useState('month')
  const [form, setForm] = useState({
    title: '',
    description: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    color: '#6366f1',
    type: 'event'
  })

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4']

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents() {
    try {
      const { data: tasks } = await supabase.from('tasks').select('*').neq('due_date', null)
      const { data: eventsData } = await supabase.from('calendar_events').select('*')
      
      const allEvents = [
        ...(tasks?.map(t => ({
          id: t.id,
          title: t.title,
          description: t.description,
          start: t.due_date,
          end: t.due_date,
          color: t.priority === 'urgente' ? '#ef4444' : t.priority === 'alta' ? '#f59e0b' : '#6366f1',
          type: 'task'
        })) || []),
        ...(eventsData?.map(e => ({
          id: e.id,
          title: e.title,
          description: e.description,
          start: e.start_date,
          end: e.end_date,
          color: e.color,
          type: 'event'
        })) || [])
      ]
      
      setEvents(allEvents)
    } catch (err) {
      console.error('Erro ao carregar eventos:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSaveEvent(e) {
    e.preventDefault()
    try {
      const eventData = {
        title: form.title,
        description: form.description,
        start_date: form.start_date,
        end_date: form.end_date || form.start_date,
        color: form.color,
        type: form.type
      }
      
      if (editingEvent) {
        await supabase.from('calendar_events').update(eventData).eq('id', editingEvent.id)
      } else {
        await supabase.from('calendar_events').insert([eventData])
      }
      
      setShowEventForm(false)
      setEditingEvent(null)
      setForm({ title: '', description: '', start_date: '', start_time: '', end_date: '', end_time: '', color: '#6366f1', type: 'event' })
      loadEvents()
    } catch (err) {
      alert('Erro ao salvar evento')
    }
  }

  async function handleDeleteEvent(id) {
    if (confirm('Deletar este evento?')) {
      try {
        await supabase.from('calendar_events').delete().eq('id', id)
        loadEvents()
      } catch (err) {
        alert('Erro ao deletar')
      }
    }
  }

  function getDaysInMonth(date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days = []
    
    for (let i = 0; i < startingDay; i++) {
      days.push({ day: null, date: null })
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, date: new Date(year, month, i) })
    }
    
    return days
  }

  function getEventsForDate(date) {
    if (!date) return []
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(e => e.start === dateStr)
  }

  function prevMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  function nextMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const days = getDaysInMonth(currentDate)
  const today = new Date().toISOString().split('T')[0]

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Carregando calendário...</div>
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827' }}>Calendário</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={prevMonth} style={{ padding: '8px 16px', backgroundColor: '#e5e7eb', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>◀</button>
          <span style={{ padding: '8px 16px', fontWeight: '600' }}>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
          <button onClick={nextMonth} style={{ padding: '8px 16px', backgroundColor: '#e5e7eb', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>▶</button>
          <button onClick={() => setCurrentDate(new Date())} style={{ padding: '8px 16px', backgroundColor: '#6366f1', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Hoje</button>
          <button onClick={() => { setEditingEvent(null); setForm({ title: '', description: '', start_date: today, start_time: '', end_date: '', end_time: '', color: '#6366f1', type: 'event' }); setShowEventForm(true) }} style={{ padding: '8px 16px', backgroundColor: '#10b981', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>+ Evento</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', backgroundColor: '#e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
        {weekDays.map(day => (
          <div key={day} style={{ backgroundColor: '#f9fafb', padding: '12px', textAlign: 'center', fontWeight: '600', color: '#6b7280' }}>
            {day}
          </div>
        ))}
        
        {days.map((d, index) => {
          const dateStr = d.date?.toISOString().split('T')[0]
          const dayEvents = getEventsForDate(d.date)
          const isToday = dateStr === today
          
          return (
            <div 
              key={index} 
              style={{ 
                backgroundColor: 'white', 
                minHeight: '120px', 
                padding: '8px',
                border: isToday ? '2px solid #6366f1' : 'none'
              }}
            >
              {d.day && (
                <>
                  <div style={{ fontWeight: isToday ? '700' : '500', color: isToday ? '#6366f1' : '#374151', marginBottom: '4px' }}>
                    {d.day}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {dayEvents.slice(0, 3).map((event, i) => (
                      <div 
                        key={i}
                        onClick={() => { setEditingEvent(event); setForm({ ...event, start_date: event.start, end_date: event.end }); setShowEventForm(true) }}
                        style={{ 
                          fontSize: '0.7rem', 
                          padding: '2px 4px', 
                          backgroundColor: event.color, 
                          color: 'white', 
                          borderRadius: '4px',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>+{dayEvents.length - 3} mais</div>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      {showEventForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', width: '100%', maxWidth: '500px' }}>
            <h3 style={{ marginBottom: '20px' }}>{editingEvent ? 'Editar' : 'Novo'} Evento</h3>
            <form onSubmit={handleSaveEvent} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Título</label>
                <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Descrição</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', minHeight: '60px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Data Início</label>
                  <input type="date" value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})} required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Data Fim</label>
                  <input type="date" value={form.end_date} onChange={e => setForm({...form, end_date: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Cor</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {colors.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setForm({...form, color})}
                      style={{ 
                        width: '32px', 
                        height: '32px', 
                        backgroundColor: color, 
                        border: form.color === color ? '3px solid #111' : 'none', 
                        borderRadius: '50%',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                {editingEvent && (
                  <button type="button" onClick={() => handleDeleteEvent(editingEvent.id)} style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    Deletar
                  </button>
                )}
                <button type="button" onClick={() => setShowEventForm(false)} style={{ padding: '10px 20px', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}