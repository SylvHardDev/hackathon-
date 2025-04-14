export type Role = 'admin' | 'employe' | 'client';

export type TypeAction = 
  | 'creation_projet'
  | 'edition_image'
  | 'changement_statut'
  | 'upload_media'
  | 'ajout_commentaire'
  | 'ajout_commentaire_video'
  | 'validation_projet';

export interface Utilisateur {
  id: string;            // UUID (lié à auth.users)
  nom: string;
  email: string;
  role: Role;
}

export interface Projet {
  id: number;
  titre: string;
  description?: string;
  statut: 'ouvert' | 'en_realisation' | 'en_validation' | 'modification_demandee' | 'valide' | 'ferme';
  type_media: 'image' | 'video';
  created_at: string;
  created_by?: string;   // ID de l'utilisateur qui a créé le projet
}

export interface ProjetUtilisateur {
  projet_id: number;
  utilisateur_id: string;
  role: 'client' | 'employe';  // Le rôle de l'utilisateur dans ce projet spécifique
  created_at: string;
}

export interface Media {
  id: number;
  projet_id: number;
  type: 'image' | 'video';
  url: string;
  miniature_url?: string;  // URL de la miniature pour les vidéos
  duree_secondes?: number; // Durée en secondes pour les vidéos
  created_at: string;
  created_by: string;     // ID de l'utilisateur qui a uploadé le média
}

export interface Commentaire {
  id: number;
  projet_id: number;
  auteur_id: string;
  contenu: string;
  created_at: string;
  auteur?: Pick<Utilisateur, 'nom' | 'email'>; // Jointure possible avec utilisateur
}

export interface VideoComment {
  id: number;
  media_id: number;
  auteur_id: string;
  contenu: string;
  timestamp_seconds: number;
  created_at: string;
  auteur?: Pick<Utilisateur, 'nom' | 'email'>; // Jointure possible avec utilisateur
}

export interface ValidationProjet {
  id: number;
  projet_id: number;
  statut: 'valide' | 'modification_demandee';
  commentaire?: string;
  valide_par: string;    // utilisateur_id du valideur (ex: client qui approuve ou demande modif)
  created_at: string;
  validateur?: Pick<Utilisateur, 'nom' | 'email'>; // Jointure possible avec utilisateur
}

export interface JournalActivite {
  id: number;
  projet_id: number;
  type_action: TypeAction;
  description: string;
  auteur_id: string;
  created_at: string;
  auteur?: Pick<Utilisateur, 'nom' | 'email'>; // Jointure possible avec utilisateur
}

// Types pour les réponses de l'API
export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}

// Types pour les hooks React Query
export interface QueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Types pour les mutations
export interface MutationResult<T, V> {
  mutate: (variables: V) => Promise<T>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

// Types pour les props des composants
export interface KanbanBoardProps {
  projects: Projet[];
  onProjectDrop?: (projectId: number, newStatus: Projet['statut']) => void;
}

export interface ProjectCardProps {
  project: Projet;
  onClick?: () => void;
}

export interface ChatProps {
  projectId: number;
  onNewMessage?: (message: string) => void;
}

export interface ImageEditorModalProps {
  imageUrl: string;
  projectId: number;
  open: boolean;
  onClose: () => void;
  onSave?: (editedImageUrl: string) => void;
}

// Types pour les événements
export interface ProjectStatusChangeEvent {
  projectId: number;
  newStatus: Projet['statut'];
  userId: string;
  timestamp: string;
}

export interface CommentEvent {
  projectId: number;
  commentId: number;
  authorId: string;
  content: string;
  timestamp: string;
}

// Types pour les configurations
export interface SupabaseConfig {
  url: string;
  anonKey: string;
  storageBucket: string;
}

export interface AppConfig {
  supabase: SupabaseConfig;
  features: {
    realtimeUpdates: boolean;
    fileUpload: boolean;
    imageEditing: boolean;
  };
} 