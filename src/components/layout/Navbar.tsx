
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, Camera, FileText, Info, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-primary rounded-full animate-pulse opacity-75"></div>
              <div className="absolute inset-1 bg-background rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">A</span>
              </div>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block text-gradient">Anidex</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </Button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/identify" className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
            <Camera size={18} />
            <span>Identify</span>
          </Link>
          <Link to="/describe" className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
            <FileText size={18} />
            <span>Describe</span>
          </Link>
          <Link to="/guide" className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
            <Info size={18} />
            <span>Guide</span>
          </Link>
          <Button variant="outline" size="sm" className="gap-2">
            <Search size={16} />
            <span>Search</span>
          </Button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-border animate-fade-in">
          <nav className="container py-4 flex flex-col gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/identify"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Camera size={18} />
              <span>Identify</span>
            </Link>
            <Link
              to="/describe"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText size={18} />
              <span>Describe</span>
            </Link>
            <Link
              to="/guide"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Info size={18} />
              <span>Guide</span>
            </Link>
            <div className="pt-2">
              <Button variant="outline" className="w-full gap-2">
                <Search size={16} />
                <span>Search</span>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
