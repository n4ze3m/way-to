CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  access_token TEXT := replace(new.id::TEXT, '-', '');
BEGIN
  INSERT INTO public."User" ("id", email, access_token)
  VALUES (NEW.id, NEW.email, access_token::TEXT);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
