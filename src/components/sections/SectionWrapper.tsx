import React, { ReactNode } from 'react';

interface SectionWrapperProps {
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <section className={`py-12 lg:py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
