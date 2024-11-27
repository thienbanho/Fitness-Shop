import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://abpdizoyrhzdctbzlgri.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFicGRpem95cmh6ZGN0YnpsZ3JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MDkwNzQsImV4cCI6MjA0NzA4NTA3NH0.KQJuMktiyr2gT0thnw-ntrOCy_igO2P_TPkhasNUbeM"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase