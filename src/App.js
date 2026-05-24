import React, { useState } from 'react';

const TennisVereinsApp = () => {
  const [screen, setScreen] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date('2026-05-24'));
  const [bookings, setBookings] = useState([
    { id: 1, court: 'Court 1', time: '10:00-11:00', player: 'Max M.', status: 'confirmed' },
    { id: 2, court: 'Court 2', time: '14:00-15:00', player: 'Lisa K.', status: 'confirmed' }
  ]);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setScreen('login');
    setMenuOpen(false);
  };

  const addBooking = (court, time) => {
    const newBooking = {
      id: bookings.length + 1,
      court,
      time,
      player: 'Du',
      status: 'confirmed'
    };
    setBookings([...bookings, newBooking]);
    setScreen('bookings');
  };

  if (!isLoggedIn) {
    return (
      <div style={{ background: 'linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <div style={{ fontSize: '48px', marginBottom: '1.5rem' }}>🎾</div>
          <h1 style={{ fontSize: '28px', fontWeight: '500', marginBottom: '0.5rem', color: '#1D9E75' }}>TennisVerein+</h1>
          <p style={{ color: '#888', marginBottom: '2rem', fontSize: '14px' }}>Vereinsverwaltung leicht gemacht</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={() => handleLogin('member')} style={{ padding: '12px', background: '#1D9E75', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '15px' }}>
              Anmelden als Mitglied
            </button>
            <button onClick={() => handleLogin('trainer')} style={{ padding: '12px', background: '#534AB7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '15px' }}>
              Anmelden als Trainer/Admin
            </button>
          </div>
          
          <p style={{ marginTop: '2rem', fontSize: '12px', color: '#999' }}>Demo-Login • Keine Anmeldedaten erforderlich</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'bookings', icon: '📅', label: 'Buchungen' },
    { id: 'tournaments', icon: '🏆', label: 'Turniere' },
    { id: 'members', icon: '👥', label: 'Mitglieder', adminOnly: true }
  ];

  const visibleNavItems = navItems.filter(item => !item.adminOnly || userRole === 'trainer');

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: 'white', borderBottom: '1px solid #ddd', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ fontSize: '18px', fontWeight: '500', margin: 0, color: '#1D9E75' }}>🎾 TennisVerein+</h1>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: '8px' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      {menuOpen && (
        <div style={{ background: 'white', borderBottom: '1px solid #ddd', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {visibleNavItems.map(item => (
            <button key={item.id} onClick={() => { setScreen(item.id); setMenuOpen(false); }} style={{ padding: '12px', textAlign: 'left', background: screen === item.id ? '#E6F1FB' : 'transparent', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', color: screen === item.id ? '#185FA5' : '#333' }}>
              {item.icon} {item.label}
            </button>
          ))}
          <hr style={{ border: '1px solid #ddd', margin: '8px 0' }} />
          <div style={{ fontSize: '13px', color: '#888', padding: '0 12px' }}>Angemeldet als:</div>
          <div style={{ fontSize: '14px', fontWeight: '500', padding: '0 12px', marginBottom: '12px' }}>{userRole === 'trainer' ? 'Trainer/Admin' : 'Mitglied'}</div>
          <button onClick={handleLogout} style={{ padding: '12px', background: '#FCE8E8', color: '#A32D2D', border: '1px solid #F0BCBC', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '500' }}>
            Abmelden
          </button>
        </div>
      )}

      <div style={{ flex: 1, padding: '1rem' }}>
        {screen === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ddd', padding: '1.25rem' }}>
              <div style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Willkommen!</div>
              <h2 style={{ fontSize: '22px', fontWeight: '500', margin: '0 0 8px 0' }}>Hallo {userRole === 'trainer' ? 'Trainer' : 'Spieler'}! 👋</h2>
              <p style={{ fontSize: '14px', color: '#888', margin: 0 }}>Sonntag, 24. Mai 2026</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ddd', padding: '1rem', cursor: 'pointer' }} onClick={() => setScreen('bookings')}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📅</div>
                <div style={{ fontSize: '13px', color: '#888' }}>Buchungen</div>
                <div style={{ fontSize: '18px', fontWeight: '500' }}>{bookings.length}</div>
              </div>
              
              <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ddd', padding: '1rem', cursor: 'pointer' }} onClick={() => setScreen('tournaments')}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏆</div>
                <div style={{ fontSize: '13px', color: '#888' }}>Turniere</div>
                <div style={{ fontSize: '18px', fontWeight: '500' }}>3</div>
              </div>

              {userRole === 'trainer' && (
                <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ddd', padding: '1rem', cursor: 'pointer' }} onClick={() => setScreen('members')}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>👥</div>
                  <div style={{ fontSize: '13px', color: '#888' }}>Mitglieder</div>
                  <div style={{ fontSize: '18px', fontWeight: '500' }}>24</div>
                </div>
              )}
            </div>

            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ddd', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 12px 0' }}>Nächste Buchungen</h3>
              {bookings.slice(0, 2).map(booking => (
                <div key={booking.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #ddd' }}>
                  <div>
                    <div style={{ fontWeight: '500', fontSize: '14px' }}>{booking.court}</div>
                    <div style={{ fontSize: '13px', color: '#888' }}>{booking.time}</div>
                  </div>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#639922' }}></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {screen === 'bookings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ddd', padding: '1.25rem' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '500', margin: '0 0 12px 0' }}>Court-Buchungen</h2>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', color: '#888', display: 'block', marginBottom: '8px' }}>Datum wählen</label>
                <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={(e) => setSelectedDate(new Date(e.target.value))} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                {['Court 1', 'Court 2', 'Court 3', 'Court 4'].map((court, idx) => (
                  <div key={idx} style={{ background: '#f9f9f9', border: '1px solid #ddd', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>{court}</div>
                    <select onChange={(e) => { if (e.target.value) addBooking(court, e.target.value); e.target.value = ''; }} style={{ width: '100%', padding: '8px', fontSize: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                      <option value="">Zeit wählen</option>
                      <option value="08:00-09:00">08:00-09:00</option>
                      <option value="09:00-10:00">09:00-10:00</option>
                      <option value="10:00-11:00">10:00-11:00</option>
                      <option value="14:00-15:00">14:00-15:00</option>
                      <option value="16:00-17:00">16:00-17:00</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ddd', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 12px 0' }}>Deine Buchungen</h3>
              {bookings.map(booking => (
                <div key={booking.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #ddd' }}>
                  <div>
                    <div style={{ fontWeight: '500', fontSize: '14px' }}>{booking.court} • {booking.time}</div>
                    <div style={{ fontSize: '13px', color: '#888' }}>{booking.player}</div>
                  </div>
                  <div style={{ background: '#EAF3DE', color: '#3B6D11', padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: '500' }}>✓ Bestätigt</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {screen === 'tournaments' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '500', margin: 0 }}>Turniere & Events</h2>
            
            {[
              { name: 'Sommer-Cup 2026', date: '15. Juni - 30. Juni', participants: 24, status: 'Anmeldung läuft' },
              { name: 'Vereinsmeisterschaften', date: '20. Juli', participants: 16, status: 'Geplant' },
              { name: 'Freundschaftsspiel vs. Nachbarverein', date: '10. Juni', participants: 12, status: 'Bestätigt' }
            ].map((tournament, idx) => (
              <div key={idx} style={{ background: 'white', borderRadius: '12px', border: '1px solid #ddd', padding: '1.25rem' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '500', margin: '0 0 8px 0' }}>🏆 {tournament.name}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#888', marginBottom: '12px' }}>
                  <div>📅 {tournament.date}</div>
                  <div>👥 {tournament.participants} Teilnehmer</div>
                </div>
                <div style={{ background: tournament.status === 'Anmeldung läuft' ? '#E6F1FB' : '#EAF3DE', color: tournament.status === 'Anmeldung läuft' ? '#185FA5' : '#0F6E56', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '500', textAlign: 'center' }}>
                  {tournament.status}
                </div>
              </div>
            ))}
          </div>
        )}

        {screen === 'members' && userRole === 'trainer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '500', margin: 0 }}>Mitgliederverwaltung</h2>
            
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #ddd', padding: '1.25rem' }}>
              <input type="text" placeholder="Mitglied suchen..." style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', marginBottom: '16px', boxSizing: 'border-box' }} />
              
              {['Max Müller', 'Lisa König', 'Thomas Bauer', 'Sarah Schmidt'].map((member, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: idx < 3 ? '1px solid #ddd' : 'none' }}>
                  <div>
                    <div style={{ fontWeight: '500', fontSize: '14px' }}>{member}</div>
                    <div style={{ fontSize: '13px', color: '#888' }}>Mitglied seit 2023</div>
                  </div>
                  <button style={{ padding: '6px 12px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', color: '#888' }}>
                    Mehr
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TennisVereinsApp;
