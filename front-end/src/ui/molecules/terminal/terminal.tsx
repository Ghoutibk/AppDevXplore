interface Command {
    directory: string;
    input: string;
    output: string[];
}

interface Props {
    commands: Command[];
    directory: string;
}

const Prompt = ({ directory }: { directory: string }) => (
    <>
        <span className="text-accent">{directory}</span> <span className="text-ink-subtle">$</span>{" "}
    </>
);

export const Terminal = ({ commands, directory }: Props) => {
    return (
        <div aria-hidden="true" className="flex flex-col gap-4 rounded-2xl bg-ink p-7 font-mono text-sm leading-[1.8] text-cream">
            {commands.map((command) => (
                <div key={`${command.directory} ${command.input}`}>
                    <div>
                        <Prompt directory={command.directory} />
                        <span>{command.input}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-6">
                        {command.output.map((line) => (
                            <span key={line}>{line}</span>
                        ))}
                    </div>
                </div>
            ))}
            <div>
                <Prompt directory={directory} />
                <span className="inline-block h-4.5 w-2.25 bg-accent align-middle" />
            </div>
        </div>
    );
};
