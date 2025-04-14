import Link from "next/link";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statusColors = {
  ouvert: "bg-blue-500",
  en_realisation: "bg-yellow-500",
  en_validation: "bg-purple-500",
  modification_demandee: "bg-orange-500",
  valide: "bg-green-500",
  ferme: "bg-gray-500",
};

const mediaTypeIcons = {
  image: "🖼️",
  video: "🎥",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="h-full transition-colors hover:bg-muted/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="line-clamp-1">{project.titre}</CardTitle>
            <span className="text-2xl">
              {mediaTypeIcons[project.type_media]}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
            <div className="flex items-center space-x-2">
              <Badge
                className={`${statusColors[project.statut]} text-white`}
                variant="secondary"
              >
                {project.statut.replace("_", " ")}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(project.created_at).toLocaleDateString("fr-FR")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
