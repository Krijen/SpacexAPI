export interface SpaceXLaunch {
  id: string;
  name: string;
  date_utc: string;
  date_unix: number;
  success: boolean | null;
  upcoming: boolean;
  details: string | null;
  flight_number: number;
  rocket: string;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    webcast: string | null;
    youtube_id: string | null;
    article: string | null;
    wikipedia: string | null;
  };
  cores: Array<{
    core: string | null;
    flight: number | null;
    reused: boolean | null;
    landing_success: boolean | null;
    landing_type: string | null;
  }>;
  payloads: string[];
  launchpad: string;
  failures: Array<{
    time: number;
    altitude: number | null;
    reason: string;
  }>;
}

export interface SpaceXRocket {
  id: string;
  name: string;
  type: string;
  description: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  height: { meters: number; feet: number };
  diameter: { meters: number; feet: number };
  mass: { kg: number; lb: number };
  engines: {
    number: number;
    type: string;
    version: string;
    layout: string | null;
    isp: { sea_level: number; vacuum: number };
    thrust_sea_level: { kN: number; lbf: number };
    thrust_vacuum: { kN: number; lbf: number };
    propellant_1: string;
    propellant_2: string;
  };
  flickr_images: string[];
  wikipedia: string;
}

export interface LaunchResponse {
  id: string;
  name: string;
  date_utc: string;
  date_unix: number;
  success: boolean | null;
  upcoming: boolean;
  details: string | null;
  flight_number: number;
  rocket_id: string;
  rocket?: SpaceXRocket;
  links: {
    patch: { small: string | null; large: string | null };
    webcast: string | null;
    youtube_id: string | null;
    article: string | null;
    wikipedia: string | null;
  };
  cores: SpaceXLaunch['cores'];
  payloads: string[];
  launchpad: string;
  failures: SpaceXLaunch['failures'];
}
