-- TABLA DE USUARIOS Y ROLES (SPRINT 1)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('alumno', 'mentor', 'padre', 'admin')) NOT NULL,
  level TEXT DEFAULT 'Explorador',
  skill_coins INTEGER DEFAULT 19,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- USUARIOS INICIALES
INSERT INTO public.profiles (name, username, role, level, skill_coins) VALUES
  ('Carmen Fernández', 'carmen', 'alumno', 'Explorador', 19),
  ('Tutor Principal', 'mentor', 'mentor', 'Explorador', 0),
  ('Familia Fernández', 'familia', 'padre', 'Explorador', 19),
  ('Administrador General', 'admin', 'admin', 'Explorador', 0)
ON CONFLICT (username) DO NOTHING;

-- ACTIVIDADES
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  score TEXT NOT NULL,
  coins_earned INTEGER DEFAULT 5,
  completed_at TIMESTAMPTZ DEFAULT now()
);