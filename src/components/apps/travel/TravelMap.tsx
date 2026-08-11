"use client";

import { useEffect, useMemo } from "react";
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import type { TravelTrip } from "@/content/travel";
import "leaflet/dist/leaflet.css";

type TravelMapProps = {
  trips: TravelTrip[];
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onOpen: (id: string) => void;
};

function MapResizeFix() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    const ro = new ResizeObserver(() => {
      map.invalidateSize({ animate: false });
    });
    ro.observe(container);
    map.invalidateSize({ animate: false });
    return () => ro.disconnect();
  }, [map]);

  return null;
}

function FitTrips({ trips }: { trips: TravelTrip[] }) {
  const map = useMap();

  useEffect(() => {
    if (trips.length === 0) return;
    const bounds = L.latLngBounds(trips.map((t) => [t.lat, t.lng]));
    map.fitBounds(bounds.pad(0.35), { animate: false });
  }, [map, trips]);

  return null;
}

function FocusTrip({
  trips,
  selectedId,
}: {
  trips: TravelTrip[];
  selectedId: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;
    const trip = trips.find((t) => t.id === selectedId);
    if (!trip) return;
    map.panTo([trip.lat, trip.lng], { animate: true, duration: 0.35 });
  }, [selectedId, map, trips]);

  return null;
}

export function TravelMap({
  trips,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  onOpen,
}: TravelMapProps) {
  const center = useMemo<[number, number]>(() => {
    if (trips.length === 0) return [46.5, 2.5];
    const lat = trips.reduce((s, t) => s + t.lat, 0) / trips.length;
    const lng = trips.reduce((s, t) => s + t.lng, 0) / trips.length;
    return [lat, lng];
  }, [trips]);

  return (
    <MapContainer
      center={center}
      zoom={4}
      className="travel-map h-full w-full"
      scrollWheelZoom
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CARTO'
      />
      <MapResizeFix />
      <FitTrips trips={trips} />
      <FocusTrip trips={trips} selectedId={selectedId} />

      {trips.map((trip) => {
        const active = selectedId === trip.id || hoveredId === trip.id;
        return (
          <CircleMarker
            key={trip.id}
            center={[trip.lat, trip.lng]}
            radius={active ? 11 : 7}
            pathOptions={{
              color: trip.accent,
              fillColor: trip.accent,
              fillOpacity: active ? 0.85 : 0.45,
              weight: active ? 3 : 2,
              opacity: active ? 1 : 0.75,
            }}
            eventHandlers={{
              click: () => {
                onSelect(trip.id);
                onOpen(trip.id);
              },
              mouseover: () => onHover(trip.id),
              mouseout: () => onHover(null),
            }}
          >
            <Tooltip
              direction="top"
              offset={[0, -8]}
              opacity={0.95}
              className="travel-map-tooltip"
            >
              <span className="font-mono text-[11px]">{trip.name}</span>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
