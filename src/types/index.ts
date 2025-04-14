export type UserRole = 'admin' | 'employe' | 'client';

export interface User {
  id: string;
  nom: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export type ProjectStatus = 'ouvert' | 'en_realisation' | 'en_validation' | 'modification_demandee' | 'valide' | 'ferme';
export type MediaType = 'image' | 'video';

export interface Project {
  id: string;
  titre: string;
  description: string;
  statut: ProjectStatus;
  type_media: MediaType;
  created_at: string;
  updated_at: string;
}

export interface ProjectUser {
  projet_id: string;
  utilisateur_id: string;
  role: UserRole;
}

export interface Media {
  id: string;
  projet_id: string;
  type: MediaType;
  url: string;
  created_at: string;
}

export interface Comment {
  id: string;
  projet_id: string;
  auteur_id: string;
  contenu: string;
  created_at: string;
}

export interface VideoComment {
  id: string;
  media_id: string;
  auteur_id: string;
  contenu: string;
  timestamp_seconds: number;
  created_at: string;
}

export interface ProjectValidation {
  id: string;
  projet_id: string;
  statut: ProjectStatus;
  commentaire: string;
  valide_par: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  projet_id: string;
  type_action: string;
  description: string;
  auteur_id: string;
  created_at: string;
} 