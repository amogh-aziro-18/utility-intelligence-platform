import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CloudRain, Wind, Thermometer, Droplets, Eye, Zap, Waves, Sun } from "lucide-react";
import { weatherNow, weatherForecast, utilityResilience } from "@/lib/disaster-data";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, AreaChart, Area } from "recharts";

export const Route = createFileRoute("/weather")({
  head: () => ({ meta: [{ title: "Weather Intelligence · Aziro" }] }),
  component: WeatherPage,
});

const cards = [
  { l: "Temperature", v: `${weatherNow.temp}°C`, i: Thermometer },
  { l: "Humidity", v: `${weatherNow.humidity}%`, i: Droplets },
  { l: "Rain Probability", v: `${weatherNow.rainProb}%`, i: CloudRain },
  { l: "Wind Speed", v: `${weatherNow.wind} km/h`, i: Wind },
  { l: "Heat Index", v: `${weatherNow.heatIndex}°C`, i: Sun },
  { l: "Visibility", v: `${weatherNow.visibility} km`, i: Eye },
  { l: "Air Quality", v: `AQI ${weatherNow.aqi}`, i: Waves },
  { l: "Lightning Risk", v: weatherNow.lightningRisk, i: Zap },
];

const alerts = [
  { l: "Storm Alert", v: weatherNow.stormAlert, sev: "High" },
  { l: "Flood Risk", v: weatherNow.floodRisk, sev: "Medium" },
  { l: "Cyclone Watch", v: weatherNow.cycloneWatch, sev: "Low" },
  { l: "Heatwave Warning", v: weatherNow.heatwaveWarning, sev: "Low" },
  { l: "Lightning Risk", v: weatherNow.lightningRisk, sev: "High" },
];

const sevColor: Record<string, string> = {
  High: "border-destructive text-destructive",
  Medium: "border-[color:var(--warning)] text-[color:var(--warning-foreground)]",
  Low: "border-[color:var(--success)] text-[color:var(--success)]",
};

function WeatherPage() {
  return (
    <>
      <PageHeader
        title="Weather Intelligence"
        description="Live weather, forecast and operational weather impact across utilities"
      />
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
          {cards.map((c) => (
            <Card key={c.l} className="rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{c.l}</div>
                  <c.i className="h-3.5 w-3.5 text-[var(--navy)]" />
                </div>
                <div className="mt-1 text-xl font-semibold">{c.v}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="rounded-xl xl:col-span-2">
            <CardHeader><CardTitle className="text-sm">24-Hour Forecast</CardTitle></CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weatherForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="h" tick={{ fontSize: 10 }} interval={2} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line dataKey="temp" name="Temp °C" stroke="var(--navy)" strokeWidth={2} dot={false} />
                  <Line dataKey="rain" name="Rain %" stroke="var(--info)" strokeWidth={2} dot={false} />
                  <Line dataKey="wind" name="Wind km/h" stroke="var(--teal)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm">Weather Alerts</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {alerts.map((a) => (
                <div key={a.l} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium">{a.l}</div>
                    <Badge variant="outline" className={`text-[10px] ${sevColor[a.sev]}`}>{a.sev}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{a.v}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-sm">Weather → Utility Impact Matrix</CardTitle>
            <p className="text-xs text-muted-foreground">How current weather translates into operational load and priority per utility</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-muted-foreground">
                  <tr className="border-b">
                    <th className="text-left py-2 pr-3">Utility</th>
                    <th className="text-left py-2 pr-3">Weather Impact</th>
                    <th className="text-left py-2 pr-3">Disaster Risk</th>
                    <th className="text-left py-2 pr-3">Resilience</th>
                    <th className="text-left py-2 pr-3">Continuity</th>
                    <th className="text-left py-2 pr-3">Recovery Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {utilityResilience.map((u) => (
                    <tr key={u.name} className="border-b last:border-0">
                      <td className="py-2 pr-3 font-medium">{u.name}</td>
                      <td className="py-2 pr-3">
                        <Badge variant="outline" className={`text-[10px] ${u.weatherImpact === "Very High" || u.weatherImpact === "High" ? "border-destructive text-destructive" : "border-[color:var(--warning)] text-[color:var(--warning-foreground)]"}`}>{u.weatherImpact}</Badge>
                      </td>
                      <td className="py-2 pr-3">
                        <Badge variant="outline" className="text-[10px]">{u.disasterRisk}</Badge>
                      </td>
                      <td className="py-2 pr-3 w-40">
                        <div className="flex items-center gap-2">
                          <Progress value={u.resilience} className="h-1.5 w-24" />
                          <span className="text-xs tabular-nums">{u.resilience}%</span>
                        </div>
                      </td>
                      <td className="py-2 pr-3 w-40">
                        <div className="flex items-center gap-2">
                          <Progress value={u.continuity} className="h-1.5 w-24" />
                          <span className="text-xs tabular-nums">{u.continuity}%</span>
                        </div>
                      </td>
                      <td className="py-2 pr-3">P{u.recoveryPri}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader><CardTitle className="text-sm">Rainfall Intensity · Rolling 24h</CardTitle></CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weatherForecast}>
                <defs>
                  <linearGradient id="rain2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--info)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--info)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="h" tick={{ fontSize: 10 }} interval={2} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Area dataKey="rain" stroke="var(--info)" fill="url(#rain2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
