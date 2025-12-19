import React, { useState, useEffect } from 'react';
import { Mail, Lock, Building, User, Loader2, LogIn, UserPlus, Eye, EyeOff, Copy, Check, DollarSign, Coins, Euro, TrendingUp, TrendingDown, PiggyBank, Wallet, CreditCard, Banknote, ChartBar, ChartLine } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface UserData {
  nombre: string;
  email: string;
  empresa: string;
  telefono: string;
}

interface FloatingIcon {
  id: number;
  type: 'dollar' | 'coins' |'euro' | 'piggy' | 'wallet' | 'card' | 'bill' | 'chartBar' | 'chartLine' | 'trendUp' | 'trendDown';
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

const BankAnalyzerLanding: React.FC = () => {
  const [mode, setMode] = useState<'initial' | 'register' | 'login'>('initial');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);
  const [phoneError, setPhoneError] = useState('');
  
  const [registerData, setRegisterData] = useState<UserData>({
    nombre: '',
    email: '',
    empresa: '',
    telefono: ''
  });
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Generar iconos flotantes
  useEffect(() => {
    if (mode === 'initial') {
      const icons: FloatingIcon[] = [];
      const types: Array<'dollar' | 'coins' |'euro' | 'piggy' | 'wallet' | 'card' | 'bill' | 'chartBar' | 'chartLine' | 'trendUp' | 'trendDown'> = 
        ['dollar', 'coins', 'euro', 'piggy', 'wallet', 'card', 'bill', 'chartBar', 'chartLine', 'trendUp', 'trendDown'];
      
      for (let i = 0; i < 20; i++) {
        icons.push({
          id: i,
          type: types[Math.floor(Math.random() * types.length)],
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 10 + Math.random() * 8,
          size: 24 + Math.random() * 32,
          rotation: Math.random() * 360
        });
      }
      setFloatingIcons(icons);
    }
  }, [mode]);

  const generateSecurePassword = (): string => {
    const length = 12;
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%&*';
    
    const allChars = lowercase + uppercase + numbers + symbols;
    
    let password = '';
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    return password.split('').sort(() => Math.random() - 0.5).join('');
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword).then(() => {
      setPasswordCopied(true);
      setTimeout(() => setPasswordCopied(false), 2000);
    });
  };

  const handlePhoneChange = (value: string | undefined) => {
    setRegisterData({ ...registerData, telefono: value || '' });
    setPhoneError('');
    
    // Validar en tiempo real si hay valor
    if (value) {
      try {
        if (!isValidPhoneNumber(value)) {
          setPhoneError('Formato de teléfono inválido');
        }
      } catch (e) {
        setPhoneError('Número de teléfono inválido');
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setPhoneError('');
    
    if (!registerData.nombre || !registerData.email || !registerData.empresa || !registerData.telefono) {
      setError('Por favor, completa todos los campos obligatorios');
      return;
    }
    
    if (!isValidEmail(registerData.email)) {
      setError('Por favor, introduce un email válido');
      return;
    }
    
    // Validar teléfono con librería
    try {
      if (!isValidPhoneNumber(registerData.telefono)) {
        setError('Por favor, introduce un número de teléfono válido para el país seleccionado');
        setPhoneError('Número de teléfono inválido');
        return;
      }
    } catch (e) {
      setError('Por favor, introduce un número de teléfono válido');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newPassword = generateSecurePassword();
      setGeneratedPassword(newPassword);
      
      const webhookURL = 'https://hook.eu2.make.com/hqxtcvme2c8eq312kp3vb7hmk0q15qw7';
      
      const payload = {
        Name: registerData.nombre,
        Email: registerData.email,
        Company: registerData.empresa,
        Phone: registerData.telefono, // Ya viene en formato internacional (ej: +34612345678)
        Password: newPassword,
        fecha_registro: new Date().toISOString()
      };
      
      console.log('Enviando datos de registro:', { ...payload, Password: '***' });
      
      const response = await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      console.log('Respuesta del webhook:', response.status);
      
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }
      
      setSuccess(`¡Registro exitoso! Tu contraseña es: ${newPassword}`);
      
    } catch (err) {
      console.error('Error al registrar:', err);
      setError('Hubo un error al procesar tu registro. Por favor intenta de nuevo.');
      setGeneratedPassword('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!loginData.email || !loginData.password) {
      setError('Por favor, completa todos los campos');
      return;
    }
    
    if (!isValidEmail(loginData.email)) {
      setError('Por favor, introduce un email válido');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const loginWebhookURL = 'https://hook.eu2.make.com/9k1xqiqpwr2wxrtanurzv1tc6ffnsv4r';
      
      console.log('Intentando login con:', { email: loginData.email });
      
      const response = await fetch(loginWebhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Email: loginData.email,
          Password: loginData.password
        })
      });
      
      console.log('Respuesta del servidor:', response.status);
      
      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error('Error al procesar la respuesta del servidor');
      }
      
      console.log('Datos recibidos:', data);
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Credenciales incorrectas');
      }
      
      console.log('Login exitoso para:', data.nombre);

      try {
        sessionStorage.setItem('userEmail', data.email);
        sessionStorage.setItem('userName', data.nombre);
        sessionStorage.setItem('userCompany', data.empresa || '');
      } catch (storageError) {
        console.warn('No se pudo guardar en sessionStorage:', storageError);
      }

      // Navegar a /analyzer
      window.history.pushState({}, '', '/analyzer');
      window.location.reload();
      
    } catch (err) {
      console.error('Error en login:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        setError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      } else if (errorMessage.includes('incorrectas') || errorMessage.includes('incorrect')) {
        setError('Email o contraseña incorrectos. Verifica tus credenciales e intenta nuevamente.');
      } else {
        setError('Error al iniciar sesión. Por favor intenta de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinueAfterRegister = () => {
    setRegisterData({
      nombre: '',
      email: '',
      empresa: '',
      telefono: ''
    });
    setGeneratedPassword('');
    setSuccess('');
    setMode('login');
  };

  const renderFloatingIcon = (icon: FloatingIcon) => {
    const IconComponent = {
      dollar: DollarSign,
      coins: Coins,
      euro: Euro,
      piggy: PiggyBank,
      wallet: Wallet,
      card: CreditCard,
      bill: Banknote,
      chartBar: ChartBar,
      chartLine: ChartLine,
      trendUp: TrendingUp,
      trendDown: TrendingDown
    }[icon.type];

    return (
      <div
        key={icon.id}
        style={{
          position: 'absolute',
          left: `${icon.left}%`,
          opacity: 0,
          animation: `float ${icon.duration}s ease-in-out infinite`,
          animationDelay: `${icon.delay}s`,
          top: '-100px',
          pointerEvents: 'none',
          color: 'rgba(229, 180, 95, 0.4)',
          filter: 'drop-shadow(0 2px 8px rgba(229, 180, 95, 0.3))'
        }}
      >
        <IconComponent size={icon.size} strokeWidth={1.5} />
      </div>
    );
  };

  if (mode === 'initial') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #203c42 0%, #2a4c53 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Iconos flotantes */}
        {floatingIcons.map(icon => renderFloatingIcon(icon))}
        
        <div style={{
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <img 
              src="/MindChef_white.png" 
              alt="MindChef" 
              style={{ height: '64px', width: 'auto' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              margin: 0
            }}>
              MindChef
            </h1>
          </div>
          
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            marginBottom: '1rem',
            opacity: 0.9
          }}>
            Analiza tus gastos reales en 2 minutos
          </p>
          
          <p style={{
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            marginBottom: '3rem',
            opacity: 0.7
          }}>
            ¿Dónde se te va el dinero de tu restaurante?
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <button
              onClick={() => setMode('register')}
              style={{
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #e5b45f 0%, #d4a04a 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(229, 180, 95, 0.3)'
              }}
            >
              <UserPlus size={24} />
              Crear cuenta gratis
            </button>
            
            <button
              onClick={() => setMode('login')}
              style={{
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: 600,
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
            >
              <LogIn size={24} />
              Ya tengo cuenta
            </button>
          </div>
        </div>
        
        <style>{`
          @keyframes float {
            0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 0;
            }
            5% {
              opacity: 0.6;
            }
            50% {
              opacity: 0.4;
            }
            95% {
              opacity: 0.6;
            }
            100% {
              transform: translateY(100vh) rotate(180deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  }

  if (mode === 'register') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #203c42 0%, #2a4c53 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          background: 'white',
          borderRadius: '1rem',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            color: '#203c42',
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}>
            Crear cuenta
          </h2>
          
          <p style={{
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            color: '#6b7280',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Completa tus datos para comenzar
          </p>
          
          {error && (
            <div style={{
              padding: '1rem',
              background: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              color: '#b91c1c',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}
          
          {success && generatedPassword && (
            <div style={{
              padding: '1.5rem',
              background: '#d1fae5',
              border: '2px solid #10b981',
              borderRadius: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                color: '#065f46',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '1rem'
              }}>
                ✅ ¡Registro exitoso!
              </div>
              
              <div style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  marginBottom: '0.5rem',
                  fontWeight: 600
                }}>
                  Tu contraseña es:
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  justifyContent: 'space-between'
                }}>
                  <code style={{
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: '#203c42',
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em'
                  }}>
                    {generatedPassword}
                  </code>
                  <button
                    onClick={copyPasswordToClipboard}
                    style={{
                      padding: '0.5rem',
                      background: passwordCopied ? '#10b981' : '#e5b45f',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}
                    title="Copiar contraseña"
                  >
                    {passwordCopied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
              
              <div style={{
                fontSize: '0.75rem',
                color: '#065f46',
                marginBottom: '1rem',
                lineHeight: '1.5'
              }}>
                ⚠️ <strong>Importante:</strong> Guarda esta contraseña en un lugar seguro. La necesitarás para iniciar sesión.
              </div>
              
              <button
                onClick={handleContinueAfterRegister}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #e5b45f 0%, #d4a04a 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <LogIn size={20} />
                Continuar al login
              </button>
            </div>
          )}
          
          {!success && (
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Nombre completo *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={20} style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    zIndex: 1
                  }} />
                  <input
                    type="text"
                    value={registerData.nombre}
                    onChange={(e) => setRegisterData({ ...registerData, nombre: e.target.value })}
                    placeholder="Tu nombre completo"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem 0.875rem 3rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Email *
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={20} style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    zIndex: 1
                  }} />
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    placeholder="tu@email.com"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem 0.875rem 3rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Empresa *
                </label>
                <div style={{ position: 'relative' }}>
                  <Building size={20} style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    zIndex: 1
                  }} />
                  <input
                    type="text"
                    value={registerData.empresa}
                    onChange={(e) => setRegisterData({ ...registerData, empresa: e.target.value })}
                    placeholder="Nombre de tu negocio de hostelería"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem 0.875rem 3rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Teléfono *
                </label>
                <div style={{ position: 'relative' }}>
                  <PhoneInput
                    international
                    defaultCountry="ES"
                    value={registerData.telefono}
                    onChange={handlePhoneChange}
                    placeholder="Ingresa tu número de teléfono"
                    style={{
                      width: '100%'
                    }}
                    className="phone-input-custom"
                  />
                  {phoneError && (
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#dc2626',
                      marginTop: '0.375rem'
                    }}>
                      {phoneError}
                    </div>
                  )}
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '1rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #e5b45f 0%, #d4a04a 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem'
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                    Registrando...
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    Crear cuenta
                  </>
                )}
              </button>
            </form>
          )}
          
          {!success && (
            <div style={{
              marginTop: '1.5rem',
              textAlign: 'center',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => setMode('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e5b45f',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Inicia sesión
              </button>
            </div>
          )}
        </div>
        
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          /* Estilos personalizados para PhoneInput */
          .phone-input-custom .PhoneInputInput {
            width: 100%;
            padding: 0.875rem 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 0.5rem;
            fontSize: 1rem;
            outline: none;
            box-sizing: border-box;
          }
          
          .phone-input-custom .PhoneInputInput:focus {
            border-color: #e5b45f;
          }
          
          .phone-input-custom .PhoneInputCountrySelect {
            margin-right: 0.5rem;
            padding: 0.5rem;
            border: 2px solid #e5e7eb;
            border-radius: 0.5rem;
            font-size: 1rem;
            outline: none;
            cursor: pointer;
          }
          
          .phone-input-custom .PhoneInputCountrySelect:focus {
            border-color: #e5b45f;
          }
          
          .phone-input-custom .PhoneInputCountryIcon {
            width: 1.5rem;
            height: 1.5rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #203c42 0%, #2a4c53 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '450px',
        width: '100%',
        background: 'white',
        borderRadius: '1rem',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: 700,
          color: '#203c42',
          marginBottom: '0.5rem',
          textAlign: 'center'
        }}>
          Iniciar sesión
        </h2>
        
        <p style={{
          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
          color: '#6b7280',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Accede con tus credenciales
        </p>
        
        {error && (
          <div style={{
            padding: '1rem',
            background: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            color: '#b91c1c',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={20} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                zIndex: 1
              }} />
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                placeholder="tu@email.com"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 3rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                zIndex: 1
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.875rem 3rem 0.875rem 3rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9ca3af',
                  padding: 0,
                  zIndex: 1
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: 600,
              background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #e5b45f 0%, #d4a04a 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem'
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                Iniciando sesión...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Iniciar sesión
              </>
            )}
          </button>
        </form>
        
        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          ¿No tienes cuenta?{' '}
          <button
            onClick={() => setMode('register')}
            style={{
              background: 'none',
              border: 'none',
              color: '#e5b45f',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Regístrate gratis
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BankAnalyzerLanding;