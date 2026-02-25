/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Wind, 
  Droplets, 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  Thermometer,
  Navigation,
  Eye,
  ArrowUp,
  ArrowDown,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { fetchWeather, fetchWeatherByCoords } from './weatherService';
import { FormattedWeather } from './types';
import { cn } from './utils';

const WeatherIcon = ({ condition, className }: { condition: string; className?: string }) => {
  const lower = condition.toLowerCase();
  if (lower.includes('sun') || lower.includes('clear')) return <Sun className={cn("text-yellow-400", className)} />;
  if (lower.includes('lightning') || lower.includes('thunder')) return <CloudLightning className={cn("text-purple-400", className)} />;
  if (lower.includes('snow') || lower.includes('ice')) return <CloudSnow className={cn("text-blue-200", className)} />;
  if (lower.includes('rain') || lower.includes('shower')) return <CloudRain className={cn("text-blue-400", className)} />;
  if (lower.includes('cloud')) return <Cloud className={cn("text-gray-400", className)} />;
  return <Sun className={cn("text-yellow-400", className)} />;
};

const AlertBanner = ({ alerts }: { alerts: FormattedWeather['alerts'] }) => {
  if (alerts.length === 0) return null;

  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="w-full max-w-4xl mb-6 space-y-2"
    >
      {alerts.map((alert, idx) => (
        <div 
          key={idx}
          className={cn(
            "p-4 rounded-2xl border flex items-start gap-4 backdrop-blur-md",
            alert.severity === 'extreme' ? "bg-red-500/20 border-red-500/50 text-red-100" :
            alert.severity === 'severe' ? "bg-orange-500/20 border-orange-500/50 text-orange-100" :
            "bg-yellow-500/20 border-yellow-500/50 text-yellow-100"
          )}
        >
          <AlertTriangle className="shrink-0 mt-1" size={20} />
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider">{alert.title}</h4>
            <p className="text-sm opacity-80">{alert.description}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState<FormattedWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(query);
      setWeather(data);
    } catch (err) {
      setError('Could not find weather for that location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      loadDefaultWeather();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
          setWeather(data);
          setLoading(false);
        } catch (err) {
          loadDefaultWeather();
        }
      },
      () => {
        loadDefaultWeather();
      }
    );
  };

  const loadDefaultWeather = async () => {
    try {
      const data = await fetchWeather('London');
      setWeather(data);
    } catch (err) {
      setError('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const getBackgroundClass = () => {
    if (!weather) return 'from-slate-900 to-slate-800';
    const condition = weather.condition.toLowerCase();
    if (condition.includes('sun') || condition.includes('clear')) return 'from-blue-400 to-blue-600';
    if (condition.includes('rain') || condition.includes('shower')) return 'from-slate-700 to-slate-900';
    if (condition.includes('cloud')) return 'from-slate-400 to-slate-600';
    if (condition.includes('snow')) return 'from-blue-100 to-blue-300';
    return 'from-slate-800 to-slate-950';
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-1000 bg-gradient-to-br flex flex-col items-center p-4 sm:p-8 font-sans text-white",
      getBackgroundClass()
    )}>
      {/* Search Bar */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md mb-8"
      >
        <form onSubmit={handleSearch} className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city..."
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-4 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder:text-white/50"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors" size={20} />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors"
          >
            <Navigation size={18} />
          </button>
        </form>
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center"
          >
            <Loader2 className="animate-spin text-white/50" size={48} />
          </motion.div>
        ) : error ? (
          <motion.div 
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/20 backdrop-blur-md border border-red-500/30 p-6 rounded-2xl text-center"
          >
            <p className="text-lg font-medium">{error}</p>
            <button 
              onClick={loadDefaultWeather}
              className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              Try London
            </button>
          </motion.div>
        ) : weather && (
          <div className="w-full flex flex-col items-center">
            <AlertBanner alerts={weather.alerts} />
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6"
            >
            {/* Main Weather Card */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-white/70 mb-2">
                    <MapPin size={18} />
                    <span className="text-lg font-medium">{weather.city}, {weather.country}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-8">
                    <h1 className="text-8xl sm:text-9xl font-light tracking-tighter">
                      {weather.temp}°
                    </h1>
                    <div className="pb-4">
                      <p className="text-2xl font-medium">{weather.condition}</p>
                      <p className="text-white/60">Feels like {weather.temp}°</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-white/40 mb-1">Humidity</span>
                      <div className="flex items-center gap-2">
                        <Droplets size={16} className="text-blue-300" />
                        <span className="font-medium">{weather.humidity}%</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-white/40 mb-1">Wind</span>
                      <div className="flex items-center gap-2">
                        <Wind size={16} className="text-emerald-300" />
                        <span className="font-medium">{weather.windSpeed} km/h</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-white/40 mb-1">UV Index</span>
                      <div className="flex items-center gap-2">
                        <Sun size={16} className="text-yellow-300" />
                        <span className="font-medium">{weather.uvIndex}</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-white/40 mb-1">Visibility</span>
                      <div className="flex items-center gap-2">
                        <Eye size={16} className="text-indigo-300" />
                        <span className="font-medium">{weather.visibility} km</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative background icon */}
                <WeatherIcon 
                  condition={weather.condition} 
                  className="absolute -right-12 -top-12 w-64 h-64 opacity-10 blur-2xl" 
                />
              </div>

              {/* Forecast Row */}
              <div className="grid grid-cols-3 gap-4">
                {weather.forecast.slice(1).map((day, idx) => (
                  <div 
                    key={day.date}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center"
                  >
                    <span className="text-sm font-medium text-white/60 mb-3">
                      {format(new Date(day.date), 'EEE')}
                    </span>
                    <WeatherIcon condition={day.condition} className="w-8 h-8 mb-4" />
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-1">
                        <ArrowUp size={12} className="text-red-400" />
                        <span className="font-bold">{day.maxTemp}°</span>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <ArrowDown size={12} className="text-blue-400" />
                        <span className="text-white/60">{day.minTemp}°</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-6">Weather Details</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Thermometer size={18} className="text-red-300" />
                      </div>
                      <span className="text-white/70">Pressure</span>
                    </div>
                    <span className="font-medium">{weather.pressure} hPa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Droplets size={18} className="text-blue-300" />
                      </div>
                      <span className="text-white/70">Humidity</span>
                    </div>
                    <span className="font-medium">{weather.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Wind size={18} className="text-emerald-300" />
                      </div>
                      <span className="text-white/70">Wind Speed</span>
                    </div>
                    <span className="font-medium">{weather.windSpeed} km/h</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6">
                <p className="text-sm text-white/60 leading-relaxed italic">
                  "The weather is what you get, climate is what you expect."
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-white/40" />
                  <span className="text-[10px] uppercase tracking-tighter text-white/30">Fredo Intelligence</span>
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="mt-auto pt-12 text-white/30 text-xs tracking-widest uppercase">
        Data provided by wttr.in • Built with precision
      </footer>
    </div>
  );
}
